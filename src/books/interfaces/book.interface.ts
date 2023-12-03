import { Thickness } from "@prisma/client";

export interface BookInterface {
  id: number,
  category_id: number,
  title: string,
  description: string,
  image_url: string,
  release_year: number,
  price: number,
  total_page: number,
  thickness: Thickness,
  createdAt: Date,
  updatedAt: Date
}