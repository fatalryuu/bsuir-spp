import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import 'express-async-errors';
import initRoutes from './routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

initRoutes(app);

export default app;
