import { productService } from "../services/product.service";
import { useAsync } from "./useAsync";

export function useCategories() {
  const { data, isLoading, error, refetch } = useAsync(
    () => productService.getCategories(),
    []
  );

  return { categories: data ?? [], isLoading, error, refetch };
}
