import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name: 'release_year', async: false})
export class ReleaseYearValidation implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    const convertToNumber = Number(value);

    return convertToNumber >= validationArguments.constraints[0] && convertToNumber <= validationArguments.constraints[1];
  }
}