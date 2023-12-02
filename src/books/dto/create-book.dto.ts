import { IsNotEmpty, IsNumber, IsNumberString, Max, Min } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty()
  @IsNumberString()
  category_id: number;

  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  release_year: number;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  total_page: number;
}