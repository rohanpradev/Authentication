import express, { NextFunction, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import authRouter from './routes/auth_routes';
import errorHandler from './middleware/error-handler';
import { CommonError } from './errors';

const app = express();

app.set('trust proxy', true);

app.use(express.json({ limit: '10kb' }));

app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }));

app.use('/api/users', authRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new CommonError('Not Found', 404));
});

app.use(errorHandler);

export default app;
