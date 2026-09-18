/**
 * Shared IndexedDB access for the planning tools.
 *
 * ── The defect this fixes ──────────────────────────────────────────────
 * v1 gave each tool its own copy of a storage helper, and both opened the
 * SAME database at the SAME version:
 *
 *   tools/budget/index.astro:391  indexedDB.open('AkaraRahsaDB', 1)
 *     onupgradeneeded -> createObjectStore('budget')   // only 'budget'
 *   tools/simpan/index.astro:163  indexedDB.open('AkaraRahsaDB', 1)
 *     onupgradeneeded -> createObjectStore('simpan')   // only 'simpan'
 *
 * Whichever tool a visitor opened first created version 1 containing exactly
 * one store. The other tool then opened version 1 *successfully*, so no
 * upgrade event ever fired, and its `db.transaction('<its own store>')` threw
 * NotFoundError. That rejection was swallowed by bare catch blocks
 * (budget:459/471, simpan:283/297), so the second tool a visitor used never
 * persisted anything, forever, without ever saying so.
 *
 * The fix is one database, one open, both stores created together.
 * ──────────────────────────────────────────────────────────────────────
 */

const DB_NAME = 'AkaraRahsaDB';

/**
 * Bumped 1 -> 2 deliberately. Existing visitors are carrying a half-built
 * version 1, and only a version bump will fire onupgradeneeded for them and
 * add the store they are missing. Their existing data survives, because the
 * upgrade below only ever adds stores and never drops one.
 */
const DB_VERSION = 2;

const STORES = ['budget', 'simpan'] as const;
export type StoreName = (typeof STORES)[number];

let dbPromise: Promise<IDBDatabase | null> | undefined;

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);

  return (dbPromise ??= new Promise((resolve) => {
    let req: IDBOpenDBRequest;
    try {
      req = indexedDB.open(DB_NAME, DB_VERSION);
    } catch {
      // Safari in private mode can throw outright.
      resolve(null);
      return;
    }

    req.onupgradeneeded = () => {
      const db = req.result;
      for (const name of STORES) {
        // The guard is load-bearing. A version 1 database already contains one
        // of these two stores, and calling createObjectStore on an existing
        // name throws ConstraintError, which would abort the whole upgrade and
        // take the visitor's saved data with it.
        if (!db.objectStoreNames.contains(name)) db.createObjectStore(name);
      }
    };

    req.onsuccess = () => {
      const db = req.result;
      // A visitor arriving from v1 with a second tab still open would otherwise
      // have their upgrade blocked by this connection indefinitely. Closing on
      // versionchange lets the other tab's upgrade proceed; this tab then
      // degrades to in-memory for the rest of its life, which is why the
      // reopen below is deliberately not attempted.
      db.onversionchange = () => {
        db.close();
        dbPromise = Promise.resolve(null);
      };
      resolve(db);
    };
    req.onerror = () => resolve(null);

    // Fires when another tab still holds an older version open. Without this
    // the promise would never settle and every save would hang silently.
    req.onblocked = () => resolve(null);
  }));
}

export interface Store<T> {
  get(key: string): Promise<T | null>;
  /** Resolves true only when the write actually committed. */
  set(key: string, value: T): Promise<boolean>;
}

export function createStore<T>(name: StoreName): Store<T> {
  return {
    async get(key) {
      const db = await openDb();
      if (!db) return null;
      return new Promise((resolve) => {
        try {
          const req = db.transaction(name, 'readonly').objectStore(name).get(key);
          req.onsuccess = () => {
            // v1 wrapped every value in a { value } envelope
            // (budget:414, simpan:186). Records written by the old site are
            // still on visitors' devices, so unwrap rather than orphan them.
            const raw = req.result;
            const unwrapped =
              raw && typeof raw === 'object' && 'value' in raw ? raw.value : raw;
            resolve((unwrapped as T) ?? null);
          };
          req.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      });
    },

    async set(key, value) {
      const db = await openDb();
      if (!db) return false;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction(name, 'readwrite');
          // Same { value } envelope v1 used, so a visitor who moves between
          // the old and new build in either direction keeps their data.
          tx.objectStore(name).put({ value }, key);
          // Resolve on the transaction, not the request: a request can succeed
          // and the transaction still abort on flush.
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
          tx.onabort = () => resolve(false);
        } catch {
          resolve(false);
        }
      });
    },
  };
}

/**
 * Debounced save that reports honestly. v1 printed "Tersimpan" unconditionally;
 * this only claims success when the transaction committed.
 */
export function autosave<T>(
  store: Store<T>,
  key: string,
  onStatus: (status: 'saving' | 'saved' | 'failed') => void,
  delay = 400,
): (value: T) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (value: T) => {
    clearTimeout(timer);
    onStatus('saving');
    timer = setTimeout(async () => {
      onStatus((await store.set(key, value)) ? 'saved' : 'failed');
    }, delay);
  };
}
