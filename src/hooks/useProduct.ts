import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export function useProduct(id: number | null) {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id as number),
    enabled: id !== null && Number.isFinite(id),
  });

  return {
    product: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
}
