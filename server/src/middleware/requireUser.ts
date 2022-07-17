import { Request, Response, NextFunction } from "express";

/**
 * validate request
 * if current token valid, response should be included the use info from deserializeUser function 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
function requireUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) {
    res.clearCookie('refreshToken', {
      path: '/', //	Path for the cookie
    });
    return res.sendStatus(403); //The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
  }

  return next();
}

export default requireUser;