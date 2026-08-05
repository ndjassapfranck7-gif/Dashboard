import { useMemo } from "react";
import { userService } from "../services/user.service";
import type { UserQueryParams } from "../types/user.types";
import { useAsync } from "./useAsync";

export function useUsers(params: UserQueryParams = {}) {
  const key = JSON.stringify(params);

  const { data, isLoading, error, refetch } = useAsync(
    () => userService.getAll(params),
    [key]
  );

  const users = useMemo(() => data?.users ?? [], [data]);

  return { users, total: data?.total ?? 0, isLoading, error, refetch };
}
