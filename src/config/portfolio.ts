/**
 * Portfolio entries ported from v1 src/pages/index.astro:166-181.
 *
 * v1 linked these to /portofolio/1 through /portofolio/4, routes that were
 * never built, so the landing page shipped four 404s. This file now backs a
 * real dynamic route at src/pages/portofolio/[slug].astro.
 *
 * TODO: replace every `cover` and `gallery` entry with your own work.
 *       Placeholders are Pexels stock, picked low-key for the dark ground.
 *       cover  1600x2000 (portrait 4:5)
 *       gallery 1600x1067 (landscape 3:2)
 */

export interface Project {
  slug: string;
  couple: string;
  kind: string;
  year: number;
  location: string;
  cover: string;
  alt: string;
  intro: string;
  gallery: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    slug: 'rina-andi',
    couple: 'Rina dan Andi',
    kind: 'Akad Nikah',
    year: 2026,
    location: 'Yogyakarta',
    cover:
      'https://images.pexels.com/photos/13617315/pexels-photo-13617315.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Rina dan Andi saat prosesi akad nikah',
    intro:
      'Akad pagi di rumah keluarga, dengan cahaya yang masuk lewat satu jendela. Kami merekam nyaris tanpa arahan.',
    gallery: [
      {
        src: 'https://images.pexels.com/photos/18004224/pexels-photo-18004224.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Detail tangan saat ijab kabul',
      },
      {
        src: 'https://images.pexels.com/photos/6679832/pexels-photo-6679832.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Keluarga menyaksikan prosesi',
      },
    ],
  },
  {
    slug: 'sari-budi',
    couple: 'Sari dan Budi',
    kind: 'Engagement',
    year: 2026,
    location: 'Bandung',
    cover:
      'https://images.pexels.com/photos/17657612/pexels-photo-17657612.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Sari dan Budi pada sesi lamaran',
    intro:
      'Lamaran kecil yang hanya dihadiri dua keluarga. Sore itu hujan, dan justru itu yang membuat warnanya jadi.',
    gallery: [
      {
        src: 'https://images.pexels.com/photos/27060159/pexels-photo-27060159.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Tukar cincin di ruang tamu',
      },
      {
        src: 'https://images.pexels.com/photos/26857462/pexels-photo-26857462.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Sari dan Budi di teras rumah',
      },
    ],
  },
  {
    slug: 'dewi-yoga',
    couple: 'Dewi dan Yoga',
    kind: 'Resepsi',
    year: 2026,
    location: 'Surabaya',
    cover:
      'https://images.pexels.com/photos/19950472/pexels-photo-19950472.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Resepsi Dewi dan Yoga',
    intro:
      'Resepsi malam dengan tata cahaya hangat. Kami bekerja dengan dua kamera dan hampir tidak menyalakan lampu tambahan.',
    gallery: [
      {
        src: 'https://images.pexels.com/photos/30740015/pexels-photo-30740015.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Tarian pertama di tengah tamu',
      },
      {
        src: 'https://images.pexels.com/photos/13617315/pexels-photo-13617315.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Sambutan keluarga',
      },
    ],
  },
  {
    slug: 'maya-alex',
    couple: 'Maya dan Alex',
    kind: 'Prewedding',
    year: 2026,
    location: 'Bali',
    cover:
      'https://images.pexels.com/photos/14474291/pexels-photo-14474291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Sesi prewedding Maya dan Alex',
    intro:
      'Satu hari penuh, tiga lokasi, tanpa konsep yang kaku. Mereka hanya diminta mengobrol dan kami mengikuti.',
    gallery: [
      {
        src: 'https://images.pexels.com/photos/19950472/pexels-photo-19950472.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Maya dan Alex berjalan di tepi pantai',
      },
      {
        src: 'https://images.pexels.com/photos/17657612/pexels-photo-17657612.jpeg?auto=compress&cs=tinysrgb&w=1600',
        alt: 'Potret dekat saat matahari terbenam',
      },
    ],
  },
];

/**
 * Testimonials ported from v1 index.astro:199-212.
 * Attribution gains the project type so the quote has a source, per the
 * name-plus-role rule. Em-dashes removed.
 */
export const testimonials = [
  {
    quote:
      'Pendekatannya tenang tapi tidak pasif. Kami merasa nyaman sepanjang hari, dan hasilnya tidak termakan waktu.',
    name: 'Maya dan Alex',
    role: 'Prewedding, Bali 2026',
  },
  {
    quote:
      'Profesional dari awal sampai akhir. Hasil fotonya jujur, elegan, dan benar-benar menceritakan hari kami.',
    name: 'Tari dan Dimas',
    role: 'Akad dan Resepsi, Semarang 2026',
  },
] as const;
