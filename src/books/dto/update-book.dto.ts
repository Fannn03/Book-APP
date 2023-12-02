import { IsNumberString, IsOptional, Validate } from "class-validator";
import { ReleaseYearValidation } from "../validation/release-year.validation";

export class UpdateBookDto {
  @IsOptional()
  @IsNumberString()
  category_id: number;

  @IsOptional()
  title: string;
  
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumberString()
  @Validate(ReleaseYearValidation, [1980, 2021], {
    message: "release_year cannot less than 1980 or greater than 2021"
  })
  release_year: number;

  @IsOptional()
  @IsNumberString()
  price: number;

  @IsOptional()
  total_page: number;
}