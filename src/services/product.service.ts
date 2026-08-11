import { http } from "../api/http";
import { categoriesSchema, productSchema, type CreateProductInput } from "../schemas/product.schema";
import type { Product, UpdateProductInput } from "../types/product.types";

export const productService = {
  async getAll(endpoint: string): Promise<unknown> {
    return http.get<unknown>(endpoint);
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
      `products/${id}`,
    );
    return { id: raw.id, isDeleted: raw.isDeleted ?? true };
  },
};
