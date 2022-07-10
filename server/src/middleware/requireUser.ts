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
    return res.sendStatus(403);
  }

  return next();
}

export default requireUser;