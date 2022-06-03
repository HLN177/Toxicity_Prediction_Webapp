import express, { Express } from 'express';
import config from 'config';
import connectDB from './src/db/connect';
import logger from './src/utils/logger';

const port = config.get<number>('port');

const app: Express = express();

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  await connectDB();
});