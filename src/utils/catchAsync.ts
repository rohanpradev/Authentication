import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { DatabaseValidationError } from '../errors';

type controllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: controllerFunction) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch((err: Error) => {
    let error = { ...err };
    if (err.name === 'ValidationError') {
      error = new DatabaseValidationError(err as mongoose.Error.ValidationError);
    } else if (err.name === 'CastError') {
      error = new DatabaseValidationError(err as mongoose.Error.CastError);
    }
    next(error);
  });
};

export default catchAsync;
