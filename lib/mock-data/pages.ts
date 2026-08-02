export interface MockPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mockPages: MockPage[] = [
  {
    id: 1,
    title: "Care Guide",
    slug: "care-guide",
    content:
      "Cara Merawat Furniture Kayu Wayan Wood Work.\n\nHindari paparan sinar matahari langsung.\nGunakan coaster dan table mat.\nBersihkan secara teratur.",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "FAQ",
    slug: "faq",
    content:
      "Pertanyaan yang Sering Ditanyakan.\n\nQ: Berapa lama waktu pengerjaan?\nA: 5-10 hari kerja untuk produk standar.",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    title: "Privacy Policy",
    slug: "privacy-policy",
    content:
      "Kebijakan Privasi Wayan Wood Work.\n\nKami mengumpulkan informasi yang Anda berikan secara langsung.",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 4,
    title: "Terms & Conditions",
    slug: "terms-conditions",
    content:
      "Syarat dan Ketentuan Wayan Wood Work.\n\nPemesanan dianggap sah setelah pembayaran DP diterima.",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];
