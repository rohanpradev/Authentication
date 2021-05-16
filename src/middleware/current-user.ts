import { Request, Response, NextFunction } from 'express';
import { JWTToken } from '../utils';

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) return next();
  try {
    const payload = JWTToken.verifyToken(req.session!.jwt) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
