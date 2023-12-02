import { IsNotEmpty, IsNumber, IsNumberString, Max, Min, Validate } from "class-validator";
import { ReleaseYearValidation } from "../validation/release-year.validation";

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
  @Validate(ReleaseYearValidation, [1980, 2021], {
    message: "release_year cannot less than 1980 or greater than 2021"
  })
  release_year: number;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  total_page: number;
}