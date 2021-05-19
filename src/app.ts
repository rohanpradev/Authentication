import express, { NextFunction, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import authRouter from './routes/auth_routes';
import { errorHandler, NotFoundError } from '@sgticketing/common';

const app = express();

app.set('trust proxy', true);

app.use(express.json({ limit: '10kb' }));

app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }));

app.use('/api/users', authRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Not Found'));
});

app.use(errorHandler);

export default app;
