import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from '../utils/logger';

// tell the request body what it should expect
async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    // call create user service
    const user = await createUser(req.body);
    return res.send(user);
  } catch(e: any) {
    // assume user with that email had been registered
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

async function getCurrentUser(
  req: Request,
  res: Response
) {
  return res.send(res.locals.user);
}

export {
  createUserHandler,
  getCurrentUser
};