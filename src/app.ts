import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import authRouter from './routes/auth_routes';
import middleware from './middleware';
import { errorHandler } from '@grider-courses/common';

const app = express();

app.set('trust proxy', true);

app.use(express.json({ limit: '10kb' }));

app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }));

app.use('/api/users', authRouter);

app.all('*', middleware.notFoundHandler);

app.use(errorHandler);

export default app;
