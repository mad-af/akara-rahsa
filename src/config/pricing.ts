/** Ported verbatim from v1 src/config/pricingConfig.js. Figures unchanged. */

export const pricing = {
  base: {
    akad: { 1: 1_500_000, 2: 2_500_000 },
    akadResepsi: { 1: 3_000_000, 2: 4_500_000 },
    prewedding: 1_000_000,
  },
  coverage: {
    foto: 0,
    fotoVideo: 800_000,
    drone: 500_000,
  },
  addons: {
    sameDayEdit: 750_000,
    cinematic: 1_000_000,
    liveStreaming: 500_000,
    album: 400_000,
  },
  location: {
    dalamKota: 0,
    luarKota: 300_000,
  },
} as const;

export function rupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Short form for display tiles: 1.5jt, 3jt, 4.5jt. */
export function juta(value: number): string {
  const m = value / 1_000_000;
  return `${Number.isInteger(m) ? m : m.toFixed(1)}jt`;
}

/**
 * The three headline packages, surfaced on the landing page.
 * v1 only exposed these inside the calculator, never on the marketing page.
 */
export const packages = [
  {
    id: 'akad-resepsi',
    name: 'Akad dan Resepsi',
    from: pricing.base.akadResepsi[1],
    to: pricing.base.akadResepsi[2],
    blurb:
      'Liputan penuh dua hari acara. Tim inti plus dokumentasi video, dirangkai jadi satu narasi utuh.',
    featured: true,
  },
  {
    id: 'akad',
    name: 'Akad Nikah',
    from: pricing.base.akad[1],
    to: pricing.base.akad[2],
    blurb: 'Fokus pada prosesi akad. Tenang, dekat, tanpa rekayasa.',
    featured: false,
  },
  {
    id: 'prewedding',
    name: 'Prewedding',
    from: pricing.base.prewedding,
    to: null,
    blurb: 'Sesi setengah hari di lokasi pilihan Anda berdua.',
    featured: false,
  },
] as const;
