/**
 * Rasterises the icon set with Chromium through Playwright.
 *
 * Chromium rather than a standalone SVG library on purpose: these files are
 * shown next to the SVG favicon in the same browser, so they should come out of
 * the same rasteriser. A separate engine would hint the hairlines differently
 * and the set would stop matching itself.
 *
 * Input is scripts/.icon-sources.json, written by generate_icons.py, which holds
 * one SVG per output size, each carrying its own stroke compensation. This is
 * the middle step of three; `bun run icons` runs all of them in order.
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sources = JSON.parse(readFileSync(join(root, 'scripts/.icon-sources.json'), 'utf8'));

// Which size feeds which file. 16/32/48 are the .ico members and are written as
// PNGs for the Python side to pack; the rest ship as-is.
const OUTPUTS = {
  16: 'scripts/.ico-16.png',
  32: 'scripts/.ico-32.png',
  48: 'scripts/.ico-48.png',
  180: 'public/apple-touch-icon.png',
  192: 'public/icon-192.png',
  512: 'public/icon-512.png',
};

const browser = await chromium.launch();
try {
  for (const [size, svg] of Object.entries(sources)) {
    const px = Number(size);
    const page = await browser.newPage({
      viewport: { width: px, height: px },
      // Render at 1:1. Any device scale factor would resample the result and
      // undo the per-size compensation this whole pipeline exists to apply.
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<!doctype html><meta charset="utf-8">
       <style>html,body{margin:0;padding:0;background:transparent}
              svg{display:block;width:${px}px;height:${px}px}</style>
       ${svg}`,
      { waitUntil: 'load' },
    );
    const buf = await page.locator('svg').screenshot({ omitBackground: true });
    writeFileSync(join(root, OUTPUTS[px]), buf);
    console.log(`${String(px).padStart(3)}px -> ${OUTPUTS[px]}  (${buf.length} B)`);
    await page.close();
  }
} finally {
  await browser.close();
}
