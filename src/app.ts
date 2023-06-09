import express, { Express } from 'express';
import cors from 'cors';
import { loadEnvs, connectDb, disconnectDb } from './config';
import { userRouter } from './routers/user-router';

loadEnvs();
const app = express();

app
  .use(cors())
  .use(express.json())
  .use('/user', userRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;