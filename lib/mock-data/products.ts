export interface MockProductDimension {
  id: number;
  productId: number;
  width: string;
  height: string;
  length: string;
  weight: string;
}

export interface MockProductImage {
  id: number;
  productId: number;
  image: string;
  sortOrder: number;
}

export interface MockProduct {
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
  views: number;
  orderCount: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    isActive: boolean;
  };
  images?: MockProductImage[];
  dimensions?: MockProductDimension | null;
}

let nextProductId = 100;
let nextImageId = 1000;
let nextDimensionId = 1000;

export function getNextProductId() {
  return nextProductId++;
}

export function getNextImageId() {
  return nextImageId++;
}

export function getNextDimensionId() {
  return nextDimensionId++;
}

export const mockProducts: MockProduct[] = [
  {
    id: 1,
    categoryId: 1,
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
    views: 150,
    orderCount: 12,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    category: { id: 1, name: "Kitchen", slug: "kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=533&fit=crop", description: "Handcrafted wooden kitchen tools and accessories", isActive: true },
    images: [
      { id: 1, productId: 1, image: "https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8?w=800&h=1000&fit=crop", sortOrder: 0 },
      { id: 2, productId: 1, image: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=800&h=1000&fit=crop", sortOrder: 1 },
    ],
    dimensions: { id: 1, productId: 1, width: "40 cm", height: "60 cm", length: "20 cm", weight: "3.5 kg" },
  },
  {
    id: 2,
    categoryId: 1,
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
    views: 200,
    orderCount: 18,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    category: { id: 1, name: "Kitchen", slug: "kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=533&fit=crop", description: "Handcrafted wooden kitchen tools and accessories", isActive: true },
    images: [
      { id: 3, productId: 2, image: "https://images.unsplash.com/photo-1765120828282-63dc950b6f90?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 2, productId: 2, width: "30 cm", height: "2 cm", length: "45 cm", weight: "1.5 kg" },
  },
  {
    id: 3,
    categoryId: 1,
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
    views: 120,
    orderCount: 15,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    category: { id: 1, name: "Kitchen", slug: "kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=533&fit=crop", description: "Handcrafted wooden kitchen tools and accessories", isActive: true },
    images: [
      { id: 4, productId: 3, image: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 3, productId: 3, width: "30 cm", height: "5 cm", length: "45 cm", weight: "1.2 kg" },
  },
  {
    id: 4,
    categoryId: 2,
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
    views: 180,
    orderCount: 14,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
    category: { id: 2, name: "Bathroom", slug: "bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop", description: "Elegant wooden bathroom essentials", isActive: true },
    images: [
      { id: 5, productId: 4, image: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 4, productId: 4, width: "45 cm", height: "80 cm", length: "60 cm", weight: "5 kg" },
  },
  {
    id: 5,
    categoryId: 2,
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
    views: 95,
    orderCount: 8,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    category: { id: 2, name: "Bathroom", slug: "bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop", description: "Elegant wooden bathroom essentials", isActive: true },
    images: [
      { id: 6, productId: 5, image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 5, productId: 5, width: "8 cm", height: "20 cm", length: "8 cm", weight: "0.4 kg" },
  },
  {
    id: 6,
    categoryId: 2,
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
    views: 110,
    orderCount: 9,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
    category: { id: 2, name: "Bathroom", slug: "bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop", description: "Elegant wooden bathroom essentials", isActive: true },
    images: [
      { id: 7, productId: 6, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 6, productId: 6, width: "35 cm", height: "5 cm", length: "45 cm", weight: "1.5 kg" },
  },
  {
    id: 7,
    categoryId: 2,
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
    views: 85,
    orderCount: 6,
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-15"),
    category: { id: 2, name: "Bathroom", slug: "bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop", description: "Elegant wooden bathroom essentials", isActive: true },
    images: [
      { id: 8, productId: 7, image: "https://images.unsplash.com/photo-1628304457638-562e9c885708?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 7, productId: 7, width: "40 cm", height: "60 cm", length: "40 cm", weight: "4 kg" },
  },
  {
    id: 8,
    categoryId: 2,
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
    views: 70,
    orderCount: 5,
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
    category: { id: 2, name: "Bathroom", slug: "bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop", description: "Elegant wooden bathroom essentials", isActive: true },
    images: [
      { id: 9, productId: 8, image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 8, productId: 8, width: "25 cm", height: "15 cm", length: "35 cm", weight: "1 kg" },
  },
  {
    id: 9,
    categoryId: 2,
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
    views: 130,
    orderCount: 11,
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15"),
    category: { id: 2, name: "Bathroom", slug: "bathroom", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop", description: "Elegant wooden bathroom essentials", isActive: true },
    images: [
      { id: 10, productId: 9, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 9, productId: 9, width: "50 cm", height: "30 cm", length: "15 cm", weight: "2 kg" },
  },
  {
    id: 10,
    categoryId: 3,
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
    views: 140,
    orderCount: 13,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
    category: { id: 3, name: "Living Room", slug: "living-room", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=533&fit=crop", description: "Beautiful wooden living room furniture", isActive: true },
    images: [
      { id: 11, productId: 10, image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 10, productId: 10, width: "35 cm", height: "25 cm", length: "45 cm", weight: "1.2 kg" },
  },
  {
    id: 11,
    categoryId: 3,
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
    views: 65,
    orderCount: 4,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
    category: { id: 3, name: "Living Room", slug: "living-room", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=533&fit=crop", description: "Beautiful wooden living room furniture", isActive: true },
    images: [
      { id: 12, productId: 11, image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 11, productId: 11, width: "25 cm", height: "15 cm", length: "35 cm", weight: "1 kg" },
  },
  {
    id: 12,
    categoryId: 4,
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
    views: 160,
    orderCount: 16,
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-07-01"),
    category: { id: 4, name: "Outdoor", slug: "outdoor", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=533&fit=crop", description: "Durable wooden outdoor furniture", isActive: true },
    images: [
      { id: 13, productId: 12, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop", sortOrder: 0 },
    ],
    dimensions: { id: 12, productId: 12, width: "30 cm", height: "60 cm", length: "30 cm", weight: "3 kg" },
  },
];
