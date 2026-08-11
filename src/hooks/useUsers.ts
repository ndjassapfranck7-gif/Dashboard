import { useQuery } from "@tanstack/react-query";
import { usersResponseSchema } from "../schemas/user.schema";
import { userService } from "../services/user.service";
import type { UserQueryParams } from "../types/user.types";

function buildUsersEndpoint(params: UserQueryParams = {}): string {
  const { search, ...rest } = params;
  const endpoint = search ? "users/search" : "users";
  const queryParams = search ? { q: search, ...rest } : rest;

  const query = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const qs = query.toString();
  return qs ? `${endpoint}?${qs}` : endpoint;
}

export function useUsers(params: UserQueryParams = {}) {
  const query = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const raw = await userService.getAll(buildUsersEndpoint(params));
      return usersResponseSchema.parse(raw);
    },
  });

  return {
    users: query.data?.users ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
}
