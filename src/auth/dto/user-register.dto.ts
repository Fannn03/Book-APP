import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(18)
  password: string;
}