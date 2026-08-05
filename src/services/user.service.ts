import { http } from "../api/http";
import { userSchema, usersResponseSchema } from "../schemas/user.schema";
import type { User, UsersResponse, UserQueryParams } from "../types/user.types";

function buildQuery(params: Record<string, unknown>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export const userService = {
  async getAll(params: UserQueryParams = {}): Promise<UsersResponse> {
    const { search, ...rest } = params;
    const endpoint = search ? "users/search" : "users";
    const queryParams = search ? { q: search, ...rest } : rest;

    const raw = await http.get<unknown>(`${endpoint}${buildQuery(queryParams)}`);
    return usersResponseSchema.parse(raw);
  },

  async getById(id: number): Promise<User> {
    const raw = await http.get<unknown>(`users/${id}`);
    return userSchema.parse(raw);
  },
};
