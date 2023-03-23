import express, { Express } from 'express';
import cors from 'cors';

import { loadEnvs, connectDb, disconnectDb } from './config';

loadEnvs();

const app = express();
app
  .use(cors())
  .use(express.json())

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;