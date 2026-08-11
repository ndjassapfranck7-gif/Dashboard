import { http } from "../api/http";
import { userSchema } from "../schemas/user.schema";
import type { User } from "../types/user.types";

export const userService = {
  async getAll(endpoint: string): Promise<unknown> {
    return http.get<unknown>(endpoint);
  },

  async getById(id: number): Promise<User> {
    const raw = await http.get<unknown>(`users/${id}`);
    return userSchema.parse(raw);
  },
};
