import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../errors';
import { ResponseMessageType } from '../utils';

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let errors = [{ message: 'Something went wrong' }];
  let statusCode = 400;

  if (err instanceof BaseError) {
    statusCode = err.statusCode;
    errors = err.serializeError();
  }

  res.status(statusCode).send({ status: ResponseMessageType.FAIL, errors });
};

export default globalErrorHandler;
