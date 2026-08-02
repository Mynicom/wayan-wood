import { mockCategories, MockCategory } from "@/lib/mock-data/categories";

interface CategoryQueryOptions {
  where?: Record<string, any>;
  include?: {
    _count?: { select: { products: { where: any } } };
    products?: any;
  };
  orderBy?: Record<string, string>;
}

function matchesWhere(cat: MockCategory, where: Record<string, any>): boolean {
  for (const [key, value] of Object.entries(where)) {
    if (key === "isActive" && cat.isActive !== value) return false;
    if (key === "id" && cat.id !== value) return false;
    if (key === "slug" && cat.slug !== value) return false;
  }
  return true;
}

export async function findManyCategories(options: CategoryQueryOptions = {}): Promise<any[]> {
  const { where = {}, orderBy } = options;
  let filtered = mockCategories.filter((c) => matchesWhere(c, where));

  if (orderBy) {
    const entries = Object.entries(orderBy);
    filtered.sort((a, b) => {
      for (const [field, direction] of entries) {
        const aVal = (a as any)[field];
        const bVal = (b as any)[field];
        if (aVal === undefined || bVal === undefined) continue;
        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  return filtered.map((cat) => ({
    ...cat,
    productCount: undefined,
    _count: undefined,
  }));
}

export async function findManyCategoriesWithCount(): Promise<any[]> {
  const { mockProducts } = await import("@/lib/mock-data/products");
  return mockCategories
    .filter((c) => c.isActive)
    .map((cat) => ({
      ...cat,
      productCount: mockProducts.filter((p) => p.categoryId === cat.id && p.isActive).length,
      _count: undefined,
    }));
}

export async function findUniqueCategory(where: { id?: number; slug?: string }): Promise<any | null> {
  if (where.slug) {
    return mockCategories.find((c) => c.slug === where.slug) || null;
  }
  if (where.id !== undefined) {
    return mockCategories.find((c) => c.id === where.id) || null;
  }
  return null;
}

export async function createCategory(data: any): Promise<any> {
  const newId = Math.max(...mockCategories.map((c) => c.id)) + 1;
  const newCategory: MockCategory = {
    ...data,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockCategories.push(newCategory);
  return newCategory;
}

export async function updateCategory(id: number, data: any): Promise<any | null> {
  const cat = mockCategories.find((c) => c.id === id);
  if (!cat) return null;
  Object.assign(cat, data, { updatedAt: new Date() });
  return cat;
}

export async function deleteCategory(id: number): Promise<boolean> {
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index === -1) return false;
  mockCategories.splice(index, 1);
  return true;
}
