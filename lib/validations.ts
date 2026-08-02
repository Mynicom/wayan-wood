import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  categoryId: z.number().int().positive("Kategori wajib dipilih"),
  price: z.number().positive("Harga harus lebih dari 0"),
  thumbnail: z.string().min(1, "Thumbnail wajib diisi"),
  shortDescription: z.string().default(""),
  productDescription: z.string().default(""),
  productSpecification: z.string().default(""),
  material: z.string().default(""),
  finishing: z.string().default(""),
  stock: z.number().int().min(0).default(0),
  minimumOrder: z.string().default("10 pcs"),
  leadTime: z.string().default("5-10 hari kerja"),
  isBestSeller: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  dimensions: z
    .object({
      width: z.string().default(""),
      height: z.string().default(""),
      length: z.string().default(""),
      weight: z.string().default(""),
    })
    .optional(),
  images: z.array(z.string()).optional(),
});

export const CategorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  image: z.string().min(1, "Gambar wajib diisi"),
  description: z.string().default(""),
  isActive: z.boolean().default(true),
});

export const UserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
  role: z.enum(["admin", "super_admin"]).default("admin"),
});

export const PageSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  content: z.string().default(""),
});

export const MessageSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().default(""),
  subject: z.string().default(""),
  message: z.string().min(1, "Pesan wajib diisi"),
});

export const SettingsSchema = z.object({
  websiteName: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  googleMaps: z.string().optional(),
  copyright: z.string().optional(),
});

export const OrderSchema = z.object({
  customerName: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().default(""),
  address: z.string().default(""),
  notes: z.string().default(""),
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1, "Minimal 1 item"),
});
