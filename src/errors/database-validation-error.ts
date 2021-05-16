import { Error } from 'mongoose';
import { BaseError } from './baseError';

export class DatabaseValidationError extends BaseError {
  constructor(private err: Error.ValidationError | Error.CastError, public statusCode = 400) {
    super('Database validation failed');
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeError() {
    console.error(this.err);

    switch (this.err.name) {
      case 'ValidationError':
        return Object.values(this.err.errors).map((e) => ({ message: e.message, field: e.path }));
      case 'CastError':
        return [{ message: this.err.message, field: this.err.path }];
      default:
        return [{ message: 'Some Database error' }];
    }
  }
}
