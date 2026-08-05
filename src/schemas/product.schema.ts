import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().default(""),
  category: z.string(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  brand: z.string().default("Générique"),
  thumbnail: z.string().url().or(z.string()),
  images: z.array(z.string()).default([]),
  rating: z.number().default(0),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const createProductSchema = z.object({
  title: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  category: z.string().min(1, "La catégorie est requise"),
  price: z.number().positive("Le prix doit être positif"),
  stock: z.number().int().nonnegative("Le stock ne peut pas être négatif"),
  brand: z.string().min(1, "La marque est requise"),
  thumbnail: z.string().optional(),
});

export const categoriesSchema = z.array(
  z.object({
    slug: z.string(),
    name: z.string(),
    url: z.string(),
  })
);

export type Product = z.infer<typeof productSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type Category = z.infer<typeof categoriesSchema>[number];
