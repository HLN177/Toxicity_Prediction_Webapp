import express, { Express } from 'express';
import config from 'config';
import connectDB from './src/db/connect';
import logger from './src/utils/logger';
import routes from './src/routes/routes';
import bodyParser from 'body-parser';

const port = config.get<number>('port');
const app: Express = express();

// parser needed in express
app.use(bodyParser.json());

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  await connectDB();
  routes(app);
});