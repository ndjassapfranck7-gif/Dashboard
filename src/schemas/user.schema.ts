import { z } from "zod";

export const userAddressSchema = z.object({
  address: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  country: z.string().default(""),
});

export const userCompanySchema = z.object({
  name: z.string().default(""),
  title: z.string().default(""),
  department: z.string().default(""),
});

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().default(""),
  image: z.string(),
  address: userAddressSchema,
  company: userCompanySchema,
});

export const usersResponseSchema = z.object({
  users: z.array(userSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type User = z.infer<typeof userSchema>;
