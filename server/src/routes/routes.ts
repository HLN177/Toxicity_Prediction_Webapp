import {Express, Request, Response} from 'express';
import { createUserHandler } from '../controller/user.controller';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';

/**
 * taking http request and forward to controller
 */
function routes(app: Express) {
  app.get('/test', (req: Request, res: Response) => {
    return res.sendStatus(200); 
  });

  app.post('/api/users', validate(createUserSchema), createUserHandler);
}

export default routes;