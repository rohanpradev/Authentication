export abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(public message:string) {
    super(message);
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeError(): { message: string; field?: string }[];
}
