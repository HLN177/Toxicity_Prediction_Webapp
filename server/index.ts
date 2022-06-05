import express, { Express } from 'express';
import config from 'config';
import connectDB from './src/db/connect';
import logger from './src/utils/logger';
import routes from './src/routes/routes';
import bodyParser from 'body-parser';
import deserializeUser from './src/middleware/deserializeUser';

const port = config.get<number>('port');
const app: Express = express();

// parser needed in express
app.use(bodyParser.json());

// use this middleware to get user info
// this middleware will be called on every endpoint for every request
app.use(deserializeUser);
// validate use

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  await connectDB();
  routes(app);
});