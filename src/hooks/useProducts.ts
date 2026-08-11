import { useQuery } from "@tanstack/react-query";
import { productsResponseSchema } from "../schemas/product.schema";
import { productService } from "../services/product.service";
import type { ProductQueryParams } from "../types/product.types";

function buildProductsEndpoint(params: ProductQueryParams = {}): string {
  const { search, category, ...rest } = params;

  let endpoint = "products";
  let queryParams: Record<string, unknown> = rest;

  if (search) {
    endpoint = "products/search";
    queryParams = { q: search, ...rest };
  } else if (category) {
    endpoint = `products/category/${category}`;
  }

  const query = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const qs = query.toString();
  return qs ? `${endpoint}?${qs}` : endpoint;
}

export function useProducts(params: ProductQueryParams = {}) {
  const query = useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const raw = await productService.getAll(buildProductsEndpoint(params));
      return productsResponseSchema.parse(raw);
    },
  });

  return {
    products: query.data?.products ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
}
