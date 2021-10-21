import { ValidationError } from 'class-validator';
import { ExceptionError } from './interface/exceptionError.interface';
import { BadRequestException } from '@nestjs/common';

export const ExceptionFactory = (errors: ValidationError[]) => {
  const mewErrors: ExceptionError[] = errors.map((error) => {
    return generateValidation(error);
  });
  throw new BadRequestException(mewErrors);
};

const generateValidation = (error: ValidationError): ExceptionError => {
  const err: ExceptionError = {
    key: error.property,
  };
  if (error.constraints) {
    err.message = Object.values(error.constraints);
  }
  if (error.children.length > 0) {
    err.children = error.children.map(generateValidation);
  }
  return err;
};
