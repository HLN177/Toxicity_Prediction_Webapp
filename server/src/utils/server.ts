import express, { Express } from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes/routes';

function createServer() {
  const app: Express = express();

  app.use(cors({
    origin: config.get('origin'), // tell browser to accept request from this endpoint
    credentials: true // tell the browser to expect the credentials of header
  }));

  // express need cookie parse if you use cookie
  app.use(cookieParser());

  // request parser needed in express
  app.use(bodyParser.json());

  // use this middleware to get user info
  // this middleware will be called on every endpoint for every request
  app.use(deserializeUser);// validate use
  
  routes(app);

  return app;
}

export default createServer;