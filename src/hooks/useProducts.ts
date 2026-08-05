import { useMemo } from "react";
import { productService } from "../services/product.service";
import type { ProductQueryParams } from "../types/product.types";
import { useAsync } from "./useAsync";

export function useProducts(params: ProductQueryParams = {}) {
  const key = JSON.stringify(params);

  const { data, isLoading, error, refetch } = useAsync(
    () => productService.getAll(params),
    [key]
  );

  const products = useMemo(() => data?.products ?? [], [data]);

  return { products, total: data?.total ?? 0, isLoading, error, refetch };
}
