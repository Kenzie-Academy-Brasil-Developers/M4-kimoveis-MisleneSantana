import 'express-async-errors';
import 'reflect-metadata';
import express, { Application } from 'express';
import { handleError } from './middlewares/handleError.middleware';
import { userRouter } from './routers/user.routers';
import { sessionLoginRouter } from './routers/session.routers';
import { categoryRouter } from './routers/category.routers';

const app: Application = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', sessionLoginRouter);
app.use('categories', categoryRouter);

app.use(handleError);

export default app;
