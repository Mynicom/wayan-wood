export interface MockWebsiteSettings {
  id: number;
  websiteName: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  googleMaps: string;
  copyright: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mockSettings: MockWebsiteSettings = {
  id: 1,
  websiteName: "Wayan Wood Work",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  email: "wayanwoodwork@gmail.com",
  phone: "+6281338246791",
  whatsapp: "6281338246791",
  address: "Br Tengah, Batuan, Kec. Sukawati, Kabupaten Gianyar, Bali 80582",
  instagram: "https://www.instagram.com/wayanwoodworkk/",
  facebook: "https://www.facebook.com/wayan.woodwork",
  tiktok: "",
  youtube: "",
  googleMaps: "https://maps.google.com/?q=-8.5833,115.3167",
  copyright: "2024 Wayan Wood Work. All rights reserved.",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};
