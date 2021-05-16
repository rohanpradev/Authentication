import { ValidationError } from 'express-validator';
import { BaseError } from './baseError';

export class RequestValidationError extends BaseError {
  constructor(private errors: ValidationError[], public statusCode = 400) {
    super('Invalid request parameters');
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((e) => ({ message: e.msg, field: e.param }));
  }
}
