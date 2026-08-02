import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.productDimension.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.page.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.websiteSettings.deleteMany();
  await prisma.user.deleteMany();

  // ============================================
  // 1. Create Admin User
  // ============================================
  const hashedPassword = await bcrypt.hash("password123", 10);
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@wayanwood.com",
      password: hashedPassword,
      role: "super_admin",
    },
  });
  console.log("Created admin user:", adminUser.email);

  // ============================================
  // 2. Create Categories
  // ============================================
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Kitchen",
        slug: "kitchen",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=533&fit=crop",
        description: "Handcrafted wooden kitchen tools and accessories",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Bathroom",
        slug: "bathroom",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop",
        description: "Elegant wooden bathroom essentials",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Living Room",
        slug: "living-room",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=533&fit=crop",
        description: "Beautiful wooden living room furniture",
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: "Outdoor",
        slug: "outdoor",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=533&fit=crop",
        description: "Durable wooden outdoor furniture",
        isActive: true,
      },
    }),
  ]);
  console.log("Created categories:", categories.length);

  // ============================================
  // 3. Create Products
  // ============================================
  const products = [
    {
      categoryId: categories[0].id,
      name: "Spice Rack",
      slug: "spice-rack",
      price: 1200000,
      thumbnail: "https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8?w=360&h=480&fit=crop",
      shortDescription: "Spice rack kayu dengan multiple tier untuk penyimpanan rempah",
      productDescription: "Spice rack kayu dengan multiple tier untuk penyimpanan rempah.",
      productSpecification: "Material: Oak Wood | Finishing: Natural Wood Polish",
      material: "Oak Wood",
      finishing: "Natural Wood Polish",
      stock: 8,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: true,
      isFeatured: true,
      isActive: true,
      dimensions: { width: "40 cm", height: "60 cm", length: "20 cm", weight: "3.5 kg" },
      images: [
        "https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8?w=800&h=1000&fit=crop",
        "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[0].id,
      name: "Cutting Board",
      slug: "cutting-board",
      price: 550000,
      thumbnail: "https://images.unsplash.com/photo-1765120828282-63dc950b6f90?w=360&h=480&fit=crop",
      shortDescription: "Cutting board dari kayu jati dengan permukaan halus",
      productDescription: "Cutting board dari kayu jati dengan permukaan halus.",
      productSpecification: "Material: Teak Wood | Finishing: Food Safe Oil",
      material: "Teak Wood",
      finishing: "Food Safe Oil",
      stock: 25,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: true,
      isFeatured: false,
      isActive: true,
      dimensions: { width: "30 cm", height: "2 cm", length: "45 cm", weight: "1.5 kg" },
      images: [
        "https://images.unsplash.com/photo-1765120828282-63dc950b6f90?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[0].id,
      name: "Serving Tray",
      slug: "serving-tray",
      price: 680000,
      thumbnail: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=360&h=480&fit=crop",
      shortDescription: "Serving tray kayu dengan handle ergonomis",
      productDescription: "Serving tray kayu dengan handle ergonomis.",
      productSpecification: "Material: Oak Wood | Finishing: Natural Wood Polish",
      material: "Oak Wood",
      finishing: "Natural Wood Polish",
      stock: 22,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: true,
      isFeatured: false,
      isActive: true,
      dimensions: { width: "30 cm", height: "5 cm", length: "45 cm", weight: "1.2 kg" },
      images: [
        "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[1].id,
      name: "Wooden Tray Cart",
      slug: "wooden-tray-cart",
      price: 1000000,
      thumbnail: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=360&h=480&fit=crop",
      shortDescription: "Wooden tray cart dengan kombinasi kayu natural",
      productDescription: "Wooden tray cart dengan kombinasi kayu natural & finishing elegan.",
      productSpecification: "Material: Oak Wood | Finishing: Natural Wood Polish",
      material: "Oak Wood",
      finishing: "Natural Wood Polish",
      stock: 15,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: true,
      isFeatured: true,
      isActive: true,
      dimensions: { width: "45 cm", height: "80 cm", length: "60 cm", weight: "5 kg" },
      images: [
        "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[1].id,
      name: "Wooden Soap Dispenser",
      slug: "wooden-soap-dispenser",
      price: 850000,
      thumbnail: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=360&h=480&fit=crop",
      shortDescription: "Soap dispenser kayu dengan pump stainless steel",
      productDescription: "Soap dispenser dengan kombinasi kayu natural & finishing elegan.",
      productSpecification: "Material: Oak Wood | Finishing: Natural Wood Polish",
      material: "Oak Wood",
      finishing: "Natural Wood Polish",
      stock: 25,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: false,
      isFeatured: true,
      isActive: true,
      dimensions: { width: "8 cm", height: "20 cm", length: "8 cm", weight: "0.4 kg" },
      images: [
        "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[1].id,
      name: "Luxury Tray",
      slug: "luxury-tray",
      price: 950000,
      thumbnail: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=360&h=480&fit=crop",
      shortDescription: "Luxury tray dari kayu jati dengan finishing premium",
      productDescription: "Luxury tray dari kayu jati dengan finishing premium.",
      productSpecification: "Material: Teak Wood | Finishing: Natural Wood Polish",
      material: "Teak Wood",
      finishing: "Natural Wood Polish",
      stock: 20,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: false,
      isFeatured: true,
      isActive: true,
      dimensions: { width: "35 cm", height: "5 cm", length: "45 cm", weight: "1.5 kg" },
      images: [
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[1].id,
      name: "Laundry Basket",
      slug: "laundry-basket",
      price: 1350000,
      thumbnail: "https://images.unsplash.com/photo-1628304457638-562e9c885708?w=360&h=480&fit=crop",
      shortDescription: "Laundry basket kayu dengan desain elegan",
      productDescription: "Laundry basket kayu dengan desain elegan dan fungsional.",
      productSpecification: "Material: Oak Wood | Finishing: Natural Wood Polish",
      material: "Oak Wood",
      finishing: "Natural Wood Polish",
      stock: 12,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: false,
      isFeatured: false,
      isActive: true,
      dimensions: { width: "40 cm", height: "60 cm", length: "40 cm", weight: "4 kg" },
      images: [
        "https://images.unsplash.com/photo-1628304457638-562e9c885708?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[1].id,
      name: "Wooden Tissue Box",
      slug: "wooden-tissue-box",
      price: 780000,
      thumbnail: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=360&h=480&fit=crop",
      shortDescription: "Tissue box cover dari kayu jati",
      productDescription: "Tissue box cover dari kayu jati dengan desain minimalis.",
      productSpecification: "Material: Teak Wood | Finishing: Natural Wood Polish",
      material: "Teak Wood",
      finishing: "Natural Wood Polish",
      stock: 30,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: false,
      isFeatured: false,
      isActive: true,
      dimensions: { width: "25 cm", height: "15 cm", length: "35 cm", weight: "1 kg" },
      images: [
        "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[1].id,
      name: "Towel Rack",
      slug: "towel-rack",
      price: 650000,
      thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=360&h=480&fit=crop",
      shortDescription: "Towel rack kayu dengan desain minimalis",
      productDescription: "Towel rack kayu dengan desain minimalis dan kokoh.",
      productSpecification: "Material: Oak Wood | Finishing: Natural Wood Polish",
      material: "Oak Wood",
      finishing: "Natural Wood Polish",
      stock: 18,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: true,
      isFeatured: false,
      isActive: true,
      dimensions: { width: "50 cm", height: "30 cm", length: "15 cm", weight: "2 kg" },
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[2].id,
      name: "Storage Basket",
      slug: "storage-basket",
      price: 890000,
      thumbnail: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=360&h=480&fit=crop",
      shortDescription: "Storage basket dari rotan alami",
      productDescription: "Storage basket dari rotan alami dengan desain tradisional.",
      productSpecification: "Material: Rattan | Finishing: Natural Rattan",
      material: "Rattan",
      finishing: "Natural Rattan",
      stock: 20,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: true,
      isFeatured: false,
      isActive: true,
      dimensions: { width: "35 cm", height: "25 cm", length: "45 cm", weight: "1.2 kg" },
      images: [
        "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[2].id,
      name: "Tissue Box Cover",
      slug: "tissue-box-cover",
      price: 780000,
      thumbnail: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=360&h=480&fit=crop",
      shortDescription: "Tissue box cover dari kayu oak",
      productDescription: "Tissue box cover dari kayu oak dengan desain minimalis.",
      productSpecification: "Material: Oak Wood | Finishing: Natural Wood Polish",
      material: "Oak Wood",
      finishing: "Natural Wood Polish",
      stock: 30,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: false,
      isFeatured: false,
      isActive: true,
      dimensions: { width: "25 cm", height: "15 cm", length: "35 cm", weight: "1 kg" },
      images: [
        "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=1000&fit=crop",
      ],
    },
    {
      categoryId: categories[3].id,
      name: "Plant Stand",
      slug: "plant-stand",
      price: 950000,
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=360&h=480&fit=crop",
      shortDescription: "Plant stand dari kayu jati",
      productDescription: "Plant stand dari kayu jati untuk tanaman hias.",
      productSpecification: "Material: Teak Wood | Finishing: Teak Oil",
      material: "Teak Wood",
      finishing: "Teak Oil",
      stock: 10,
      minimumOrder: "10 pcs",
      leadTime: "5-10 hari kerja",
      isBestSeller: true,
      isFeatured: true,
      isActive: true,
      dimensions: { width: "30 cm", height: "60 cm", length: "30 cm", weight: "3 kg" },
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop",
      ],
    },
  ];

  for (const productData of products) {
    const { dimensions, images, ...productFields } = productData;
    const product = await prisma.product.create({
      data: productFields,
    });

    if (dimensions) {
      await prisma.productDimension.create({
        data: {
          productId: product.id,
          ...dimensions,
        },
      });
    }

    if (images && images.length > 0) {
      await prisma.productImage.createMany({
        data: images.map((image, index) => ({
          productId: product.id,
          image,
          sortOrder: index,
        })),
      });
    }
  }
  console.log("Created products:", products.length);

  // ============================================
  // 4. Create Pages
  // ============================================
  const pages = [
    {
      title: "Care Guide",
      slug: "care-guide",
      content: "Cara Merawat Furniture Kayu Wayan Wood Work.\n\nHindari paparan sinar matahari langsung.\nGunakan coaster dan table mat.\nBersihkan secara teratur.",
    },
    {
      title: "FAQ",
      slug: "faq",
      content: "Pertanyaan yang Sering Ditanyakan.\n\nQ: Berapa lama waktu pengerjaan?\nA: 5-10 hari kerja untuk produk standar.",
    },
    {
      title: "Privacy Policy",
      slug: "privacy-policy",
      content: "Kebijakan Privasi Wayan Wood Work.\n\nKami mengumpulkan informasi yang Anda berikan secara langsung.",
    },
    {
      title: "Terms & Conditions",
      slug: "terms-conditions",
      content: "Syarat dan Ketentuan Wayan Wood Work.\n\nPemesanan dianggap sah setelah pembayaran DP diterima.",
    },
  ];

  for (const page of pages) {
    await prisma.page.create({ data: page });
  }
  console.log("Created pages:", pages.length);

  // ============================================
  // 5. Create Website Settings
  // ============================================
  await prisma.websiteSettings.create({
    data: {
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
    },
  });
  console.log("Created website settings");

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
