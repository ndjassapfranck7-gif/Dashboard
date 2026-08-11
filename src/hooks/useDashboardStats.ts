import { useQuery } from "@tanstack/react-query";
import { productsResponseSchema } from "../schemas/product.schema";
import { usersResponseSchema } from "../schemas/user.schema";
import { productService } from "../services/product.service";
import { userService } from "../services/user.service";

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalCategories: number;
}

export function useDashboardStats() {
  const query = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [productsResponse, usersResponse, categories] = await Promise.all([
        productService.getAll("products?limit=1"),
        userService.getAll("users?limit=1"),
        productService.getCategories(),
      ]);

      const products = productsResponseSchema.parse(productsResponse);
      const users = usersResponseSchema.parse(usersResponse);

      return {
        totalProducts: products.total,
        totalUsers: users.total,
        totalCategories: categories.length,
      };
    },
  });

  return {
    stats: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
}
