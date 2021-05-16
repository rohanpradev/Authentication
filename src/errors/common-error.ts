import { BaseError } from './baseError';

export class CommonError extends BaseError {
  constructor(public message: string, public statusCode = 400) {
    super(message);
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CommonError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
