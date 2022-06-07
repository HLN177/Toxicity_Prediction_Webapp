import express, { Express } from 'express';
import bodyParser from 'body-parser';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes/routes';

function createServer() {
  const app: Express = express();
  // parser needed in express
  app.use(bodyParser.json());
  // use this middleware to get user info
  // this middleware will be called on every endpoint for every request
  app.use(deserializeUser);// validate use
  
  routes(app);

  return app;
}

export default createServer;