import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from 'zod';

/**
 * When a request comes in
 * validateResource will provide a schema in the middleware
 * and validate the request against that schema 
 */

/**
 * currying
 * @param schema 
 * @returns 
 */
const validate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch(e: any) {
      return res.status(400).send(e.errors);
    }
  }
}

export default validate;