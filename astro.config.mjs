// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Deploy target is intentionally NOT hardcoded. Set these in .env (or the CI
// environment) so the same build works on Cloudflare Pages, Netlify, Vercel or
// GitHub Pages without touching this file.
//   SITE_URL=https://akarahsa.com
//   BASE_PATH=/            (GitHub Pages project sites need e.g. /akara-rahsa)
const SITE_URL = process.env.SITE_URL || 'https://akarahsa.com';
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  redirects: {
    // Carried over from the v1 site so old links keep working.
    '/kalkulator': '/tools/budget',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
