import { mockProducts, MockProduct } from "@/lib/mock-data/products";

interface ProductQueryOptions {
  where?: Record<string, any>;
  include?: {
    category?: boolean;
    images?: boolean;
    dimensions?: boolean;
    _count?: { select: { products: { where: any } } };
  };
  orderBy?: Record<string, string>;
  take?: number;
  skip?: number;
}

function matchesWhere(product: MockProduct, where: Record<string, any>): boolean {
  for (const [key, value] of Object.entries(where)) {
    if (key === "isActive" && product.isActive !== value) return false;
    if (key === "isBestSeller" && product.isBestSeller !== value) return false;
    if (key === "isFeatured" && product.isFeatured !== value) return false;
    if (key === "categoryId" && product.categoryId !== value) return false;
    if (key === "slug" && product.slug !== value) return false;
    if (key === "id" && product.id !== value) return false;
    if (key === "material" && typeof value === "object" && value.not) {
      if (product.material === value.not) return false;
    }
    if (key === "material" && typeof value === "string") {
      if (product.material !== value) return false;
    }
    if (key === "OR" && Array.isArray(value)) {
      const matchAny = value.some((condition: Record<string, any>) => {
        for (const [field, cond] of Object.entries(condition)) {
          if (cond && typeof cond === "object" && cond.contains) {
            const productValue = (product as any)[field] || "";
            if (typeof productValue === "string" && productValue.toLowerCase().includes(cond.contains.toLowerCase())) {
              return true;
            }
            return false;
          }
        }
        return false;
      });
      if (!matchAny) return false;
    }
    if (key === "category" && typeof value === "object" && value.name) {
      if (!product.category || product.category.name !== value.name) return false;
    }
  }
  return true;
}

function applyOrderBy(products: MockProduct[], orderBy?: Record<string, string>): MockProduct[] {
  if (!orderBy) return [...products];
  const sorted = [...products];
  const entries = Object.entries(orderBy);
  sorted.sort((a, b) => {
    for (const [field, direction] of entries) {
      const aVal = (a as any)[field];
      const bVal = (b as any)[field];
      if (aVal === undefined || bVal === undefined) continue;
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sorted;
}

export async function findManyProducts(options: ProductQueryOptions = {}): Promise<any[]> {
  const { where = {}, orderBy, take, skip } = options;
  let filtered = mockProducts.filter((p) => matchesWhere(p, where));
  filtered = applyOrderBy(filtered, orderBy);
  if (skip) filtered = filtered.slice(skip);
  if (take) filtered = filtered.slice(0, take);
  return filtered;
}

export async function countProducts(where: Record<string, any> = {}): Promise<number> {
  return mockProducts.filter((p) => matchesWhere(p, where)).length;
}

export async function findUniqueProduct(where: { id?: number; slug?: string }): Promise<any | null> {
  if (where.slug) {
    return mockProducts.find((p) => p.slug === where.slug) || null;
  }
  if (where.id !== undefined) {
    return mockProducts.find((p) => p.id === where.id) || null;
  }
  return null;
}

export async function createProduct(data: any): Promise<any> {
  const { mockProducts: products } = await import("@/lib/mock-data/products");
  const { getNextProductId, getNextImageId, getNextDimensionId } = await import("@/lib/mock-data/products");

  const newId = getNextProductId();
  const newProduct: MockProduct = {
    ...data,
    id: newId,
    views: 0,
    orderCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (data.categoryId) {
    const { mockCategories } = await import("@/lib/mock-data/categories");
    const cat = mockCategories.find((c) => c.id === data.categoryId);
    if (cat) {
      newProduct.category = { id: cat.id, name: cat.name, slug: cat.slug, image: cat.image, description: cat.description, isActive: cat.isActive };
    }
  }

  products.push(newProduct);

  if (data.dimensions) {
    newProduct.dimensions = {
      id: getNextDimensionId(),
      productId: newId,
      width: data.dimensions.width || "",
      height: data.dimensions.height || "",
      length: data.dimensions.length || "",
      weight: data.dimensions.weight || "",
    };
  }

  if (data.images && Array.isArray(data.images)) {
    newProduct.images = data.images.map((image: string, index: number) => ({
      id: getNextImageId(),
      productId: newId,
      image,
      sortOrder: index,
    }));
  }

  return newProduct;
}

export async function updateProduct(id: number, data: any): Promise<any | null> {
  const product = mockProducts.find((p) => p.id === id);
  if (!product) return null;

  Object.assign(product, data, { updatedAt: new Date() });

  if (data.categoryId) {
    const { mockCategories } = await import("@/lib/mock-data/categories");
    const cat = mockCategories.find((c) => c.id === data.categoryId);
    if (cat) {
      product.category = { id: cat.id, name: cat.name, slug: cat.slug, image: cat.image, description: cat.description, isActive: cat.isActive };
    }
  }

  if (data.dimensions && product.dimensions) {
    Object.assign(product.dimensions, data.dimensions);
  }

  if (data.images && Array.isArray(data.images) && product.images) {
    const { getNextImageId } = await import("@/lib/mock-data/products");
    product.images = data.images.map((image: string, index: number) => ({
      id: getNextImageId(),
      productId: id,
      image,
      sortOrder: index,
    }));
  }

  return product;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  mockProducts.splice(index, 1);
  return true;
}

export async function findDistinctMaterials(): Promise<string[]> {
  const materials = new Set<string>();
  mockProducts.forEach((p) => {
    if (p.material && p.isActive) materials.add(p.material);
  });
  return Array.from(materials);
}
