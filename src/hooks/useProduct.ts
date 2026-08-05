import { productService } from "../services/product.service";
import { useAsync } from "./useAsync";

export function useProduct(id: number | null) {
  const { data, isLoading, error, refetch } = useAsync(() => {
    if (id === null) return Promise.resolve(null as never);
    return productService.getById(id);
  }, [id]);

  return { product: data, isLoading, error, refetch };
}
