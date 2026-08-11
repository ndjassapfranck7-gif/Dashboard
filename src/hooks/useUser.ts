import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";

export function useUser(id: number | null) {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getById(id as number),
    enabled: id !== null && Number.isFinite(id),
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
}
