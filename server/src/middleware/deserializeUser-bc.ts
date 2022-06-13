import { Request, Response, NextFunction } from "express";
import { get } from "lodash"; // safer accessing a property that don't know if it exists or not
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";
// express middleware is basically a route handler
// there's essentially no difference between middleware and route handler

/**
 * validate request
 * 1. get access token and refresh token from header or cookies
 * 2. get user info from token, and set to locals
 * 3. check validation of access token and handler reissue new token
 *    and set user info to locals
 * @param req 
 * @param res 
 * @param next 
 */
async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * at the start of an authorization token, have the word "bearer"
   * Bearer means the bearer of this token gets access to the system
   */
  // 1. get access token and refresh token from header or cookie
  const accessToken = get(req, 'cookies.accessToken') || get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  const refreshToken = get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');
  // if accessToken do not existed, the requireUser function may take over later
  if (!accessToken) {
    return next();
  }
  // verify token
  const {decoded, expired} = verifyJwt(accessToken);
  // if there is a valid jwt, attach the user to res.locals
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  // if access token is expired and refreshToken existed
  // re-issue a new access token
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({refreshToken});
    if (newAccessToken) {
      /**
       * client could access via token or cookie
       */
      // set the new access token on the header of access token
      res.setHeader('x-access-token', newAccessToken);
      // set access token to cookies
      res.cookie('accessToken', newAccessToken, {
        maxAge: 900000, // 15min
        httpOnly: true,
        domain: 'localhost', // set this in config in production
        path: '/', //	Path for the cookie
        sameSite: 'strict',
        secure: false // Marks the cookie to be used with HTTPS only.
      });
    }
    // attach the user back to res.locals
    // because if they send a request with an expired access token, 
    // the request flow is just going to conitnue 
    // as if they sent the request with a valid access token given that the refresh token was valid
    const result = verifyJwt(newAccessToken as string); // handle type warning
    res.locals.user = result.decoded;
  }

  return next();
};

export default deserializeUser;