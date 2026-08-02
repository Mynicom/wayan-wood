export interface ProductDimension {
  width?: string;
  height?: string;
  length?: string;
  weight?: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  category: string;
  price: string;
  image: string;
  images?: string[];
  shortDescription?: string;
  description?: string;
  material?: string;
  finishing?: string;
  dimensions?: ProductDimension;
  stock?: number;
  minimumOrder?: string;
  leadTime?: string;
  isBestSeller?: boolean;
}
