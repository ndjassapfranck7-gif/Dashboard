import ky from "ky";

export const apiClient = ky.create({
  prefixUrl: "https://dummyjson.com",
  timeout: 10000,
  retry: {
    limit: 1,
    methods: ["get"],
  },
  headers: {
    "Content-Type": "application/json",
  },
});
