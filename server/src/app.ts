import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import 'express-async-errors';
import initRoutes from './routes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

initRoutes(app);

export default app;
