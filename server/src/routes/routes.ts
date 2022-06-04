import { Express, Request, Response } from 'express';
import validate from '../middleware/validateResource';
import { createUserHandler } from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import { createUserSessionHandler } from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';

/**
 * taking http request and forward to controller
 */
function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  // use [ ] to group middleware
  app.post('/api/users', [validate(createUserSchema)], createUserHandler);

  app.post('/api/sessions', [validate(createSessionSchema)], createUserSessionHandler);
}

export default routes;