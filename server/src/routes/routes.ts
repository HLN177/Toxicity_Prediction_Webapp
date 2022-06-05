import { Express, Request, Response } from 'express';
import validate from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';
import { createUserHandler } from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import { 
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler 
} from '../controller/session.controller';
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

  app.route('/api/sessions')
  .post([validate(createSessionSchema)], createUserSessionHandler)
  .get([requireUser], getUserSessionsHandler)
  .delete([requireUser], deleteUserSessionHandler);
}

export default routes;