/**
 * Copy ported from v1 src/pages/index.astro:109-143, with em-dashes removed.
 *
 * v1 rendered these as three identical cards in a 3-column grid. v2 renders
 * them as a pinned sticky-stack so each service reads as its own chapter
 * instead of a spec to comparison-shop.
 *
 * TODO: replace `still` with real frame grabs from your own work, 1600x1000.
 *       Placeholders are Pexels stock, chosen low-key so they sit on the
 *       near-black ground instead of fighting it.
 */

export interface Service {
  id: string;
  /** Ordering only. Deliberately not rendered: numbered labels read as
      boilerplate, and the pinned stack already conveys sequence. */
  index: string;
  name: string;
  body: string;
  still: string;
  alt: string;
}

export const services: Service[] = [
  {
    id: 'dokumentasi',
    index: '01',
    name: 'Dokumentasi Pernikahan',
    body: 'Foto dan video full-day coverage dengan pendekatan editorial dan candid. Momen tulus yang dirangkai tanpa rekayasa.',
    still:
      'https://images.pexels.com/photos/27060159/pexels-photo-27060159.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Potret hitam putih pengantin dalam balutan formal',
  },
  {
    id: 'cinematic',
    index: '02',
    name: 'Cinematic Film',
    body: 'Film pernikahan bergaya sinematografis yang menceritakan ulang hari istimewa Anda, dari pagi hingga akhir resepsi.',
    still:
      'https://images.pexels.com/photos/26857462/pexels-photo-26857462.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Pasangan pengantin di bawah untaian lampu pada malam hari',
  },
  {
    id: 'prewedding',
    index: '03',
    name: 'Prewedding dan Engagement',
    body: 'Sesi pra-nikah yang intim dan personal, di lokasi yang bermakna bagi Anda berdua. Gaya editorial, hasil gallery-worthy.',
    still:
      'https://images.pexels.com/photos/30740015/pexels-photo-30740015.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Momen dekat pasangan pengantin dengan cahaya hangat',
  },
];
