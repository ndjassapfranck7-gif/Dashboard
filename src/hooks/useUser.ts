import { userService } from "../services/user.service";
import { useAsync } from "./useAsync";

export function useUser(id: number | null) {
  const { data, isLoading, error, refetch } = useAsync(() => {
    if (id === null) return Promise.resolve(null as never);
    return userService.getById(id);
  }, [id]);

  return { user: data, isLoading, error, refetch };
}
