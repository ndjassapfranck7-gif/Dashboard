import type { KyInstance, Options } from "ky";
import { apiClient } from "./client";

class HttpClient {
  constructor(private readonly instance: KyInstance) {}

  async get<T>(url: string, options?: Options): Promise<T> {
    return this.instance.get(url, options).json<T>();
  }

  async post<T>(url: string, body?: unknown, options?: Options): Promise<T> {
    return this.instance.post(url, { json: body, ...options }).json<T>();
  }

  async put<T>(url: string, body?: unknown, options?: Options): Promise<T> {
    return this.instance.put(url, { json: body, ...options }).json<T>();
  }

  async delete<T>(url: string, options?: Options): Promise<T> {
    return this.instance.delete(url, options).json<T>();
  }
}

export const http = new HttpClient(apiClient);
