import { NextFunction, Request, Response } from 'express';
import { CommonError } from '../errors';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) return next(new CommonError('Not Authorized', 401));
  next();
};
