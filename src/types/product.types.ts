export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  rating: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProductInput {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  thumbnail?: string;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductQueryParams {
  search?: string;
  category?: string;
  limit?: number;
  skip?: number;
  sortBy?: "price" | "title";
  order?: "asc" | "desc";
}
