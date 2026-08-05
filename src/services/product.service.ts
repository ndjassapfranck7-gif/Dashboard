import { http } from "../api/http";
import {
  productSchema,
  productsResponseSchema,
  categoriesSchema,
  type CreateProductInput,
} from "../schemas/product.schema";
import type {
  Product,
  ProductsResponse,
  ProductQueryParams,
  UpdateProductInput,
} from "../types/product.types";

function buildQuery(params: Record<string, unknown>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export const productService = {
  async getAll(params: ProductQueryParams = {}): Promise<ProductsResponse> {
    const { search, category, ...rest } = params;

    let endpoint = "products";
    let queryParams: Record<string, unknown> = rest;

    if (search) {
      endpoint = "products/search";
      queryParams = { q: search, ...rest };
    } else if (category) {
      endpoint = `products/category/${category}`;
    }

    const raw = await http.get<unknown>(`${endpoint}${buildQuery(queryParams)}`);
    return productsResponseSchema.parse(raw);
  },

  async getById(id: number): Promise<Product> {
    const raw = await http.get<unknown>(`products/${id}`);
    return productSchema.parse(raw);
  },

  async getCategories() {
    const raw = await http.get<unknown>("products/categories");
    return categoriesSchema.parse(raw);
  },

  async create(input: CreateProductInput): Promise<Product> {
    const raw = await http.post<unknown>("products/add", input);
    return productSchema.parse(raw);
  },

  async update(id: number, input: UpdateProductInput): Promise<Product> {
    const raw = await http.put<unknown>(`products/${id}`, input);
    return productSchema.parse(raw);
  },

  async remove(id: number): Promise<{ id: number; isDeleted: boolean }> {
    const raw = await http.delete<{ id: number; isDeleted?: boolean }>(
      `products/${id}`
    );
    return { id: raw.id, isDeleted: raw.isDeleted ?? true };
  },
};
