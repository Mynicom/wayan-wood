export interface User {
  id: string;
  name: string | null;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  shortDescription: string;
  productDescription: string;
  productSpecification: string;
  material: string;
  finishing: string;
  stock: number;
  minimumOrder: string;
  leadTime: string;
  isBestSeller: boolean;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  images?: ProductImage[];
  dimensions?: ProductDimension | null;
}

export interface ProductImage {
  id: number;
  productId: number;
  image: string;
  sortOrder: number;
}

export interface ProductDimension {
  id: number;
  productId: number;
  width: string;
  height: string;
  length: string;
  weight: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteSettings {
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
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
