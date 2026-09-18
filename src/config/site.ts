/**
 * Single source of truth for brand + contact details.
 *
 * v1 scattered these across pages and had two defects this file fixes:
 *   - pricingConfig.js exported a placeholder WA_NUMBER ('6280000000000')
 *     while the real number was hardcoded in several .astro files.
 *   - the footer linked instagram.com/akarahsa, which is not the live
 *     account (it is akara_stories).
 */

export const site = {
  name: 'Akara Rahsa',
  tagline: 'Wedding Content Creator',
  description:
    'Studio konten pernikahan di Indonesia. Film sinematik, dokumentasi, dan prewedding dengan pendekatan editorial yang tenang.',
  locale: 'id',
  founded: 2026,
} as const;

export const contact = {
  whatsapp: '6285113658152',
  email: 'hello@akarahsa.com',
  instagram: 'akara_stories',
  tiktok: 'akara_stories',
} as const;

export const links = {
  whatsapp: `https://wa.me/${contact.whatsapp}`,
  email: `mailto:${contact.email}`,
  instagram: `https://instagram.com/${contact.instagram}`,
  tiktok: `https://tiktok.com/@${contact.tiktok}`,
} as const;

/** Resolve a site-relative path against the configured base path. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base + path.replace(/^\//, '');
}

/**
 * Nav carried over from v1 unchanged. Five items fit one desktop line.
 * Slugs are deliberately NOT translated so existing links keep working.
 */
export const nav = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#portofolio', label: 'Portofolio' },
  { href: 'tools', label: 'Tools' },
  { href: 'contact', label: 'Kontak' },
] as const;
