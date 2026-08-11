import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export function useCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => productService.getCategories(),
  });

  return {
    categories: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
}
