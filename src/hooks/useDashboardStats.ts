import { productService } from "../services/product.service";
import { userService } from "../services/user.service";
import { useAsync } from "./useAsync";

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalCategories: number;
}

export function useDashboardStats() {
  const { data, isLoading, error, refetch } = useAsync<DashboardStats>(
    async () => {
      const [products, users, categories] = await Promise.all([
        productService.getAll({ limit: 1 }),
        userService.getAll({ limit: 1 }),
        productService.getCategories(),
      ]);

      return {
        totalProducts: products.total,
        totalUsers: users.total,
        totalCategories: categories.length,
      };
    },
    []
  );

  return { stats: data, isLoading, error, refetch };
}
