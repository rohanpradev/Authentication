import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors';

const requestValidationError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) next(new RequestValidationError(errors.array()));
  next();
};

export default requestValidationError;