export interface MockCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number;
  _count?: { products: number };
}

export const mockCategories: MockCategory[] = [
  {
    id: 1,
    name: "Kitchen",
    slug: "kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=533&fit=crop",
    description: "Handcrafted wooden kitchen tools and accessories",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Bathroom",
    slug: "bathroom",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=533&fit=crop",
    description: "Elegant wooden bathroom essentials",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "Living Room",
    slug: "living-room",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=533&fit=crop",
    description: "Beautiful wooden living room furniture",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "Outdoor",
    slug: "outdoor",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=533&fit=crop",
    description: "Durable wooden outdoor furniture",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];
