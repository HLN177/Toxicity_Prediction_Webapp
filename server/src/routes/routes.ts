import { Express, Request, Response } from 'express';
import validate from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';
import { createUserHandler, getCurrentUser } from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';
import { generateSmileSchema } from '../schema/prediction.schema';
import { generateSmileFileHandler } from '../controller/prediction.controller';

/**
 * taking http request and forward to controller
 */
function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.get('/api/me', [requireUser], getCurrentUser);

  // use [ ] to group middleware
  app.post('/api/users', [validate(createUserSchema)], createUserHandler);

  app.route('/api/sessions')
  .post([validate(createSessionSchema)], createUserSessionHandler)
  .get([requireUser], getUserSessionsHandler)
  .delete([requireUser], deleteUserSessionHandler);

  app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler)

  app.route('/api/products/:productId')
  .get([validate(getProductSchema)], getProductHandler)
  .put([requireUser, validate(updateProductSchema), updateProductHandler])
  .delete([requireUser, validate(deleteProductSchema)], deleteProductHandler);

  app.post('/api/generatesmile', [requireUser, validate(generateSmileSchema)], generateSmileFileHandler);
}

export default routes;