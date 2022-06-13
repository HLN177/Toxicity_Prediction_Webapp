import { Request, Response, NextFunction } from "express";
import { get } from "lodash"; // safer accessing a property that don't know if it exists or not
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";
import { AUTH_MODEL } from "../const/session.const";
import config from 'config';
// express middleware is basically a route handler
// there's essentially no difference between middleware and route handler

const TOKEN_AUTH_MODEL = config.get('AuthModel');

function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (TOKEN_AUTH_MODEL) {
    case AUTH_MODEL['cookies']:
      deserializeByCookies(req, res, next);
      break;
    case AUTH_MODEL['tokens']:
      deserializeByTokens(req, res, next);
      break;
    case AUTH_MODEL['hybird']:
      deserializeByHybird(req, res, next);
      break;
    default:
      return next();
  }
}


async function deserializeByCookies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. get access token and refresh token from cookie
  const accessToken = get(req, 'cookies.accessToken');
  const refreshToken = get(req, 'cookies.refreshToken');
  // 2. if access token and refresh token both not existed, return;
  if (!accessToken && !refreshToken) {
    return next();
  }
  // expired accessToken will be deleted by browser
  if (accessToken) {
    const {decoded, expired} = verifyJwt(accessToken);
    // if there is a valid jwt, attach the user to res.locals
    if (decoded) {
      res.locals.user = decoded;
      return next();
    }
  } else {
    const newAccessToken = await reIssueAccessToken({refreshToken});
    if (newAccessToken) {
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
    const result = verifyJwt(newAccessToken as string); // handle type warning
    res.locals.user = result.decoded;
  }


  return next();
}

async function deserializeByTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. get access token and refresh token from header or cookie
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  const refreshToken = get(req, 'headers.x-refresh');
  // 2. if accessToken do not existed, the requireUser function may take over later
  if (!accessToken) {
    return next();
  }
  // 3. if accessToken existed, verify token
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
       * client could access via token
       */
      // set the new access token on the header of access token
      res.setHeader('x-access-token', newAccessToken);
    }
    // attach the user back to res.locals
    // because if they send a request with an expired access token, 
    // the request flow is just going to conitnue 
    // as if they sent the request with a valid access token given that the refresh token was valid
    const result = verifyJwt(newAccessToken as string); // handle type warning
    res.locals.user = result.decoded;
  }

  return next();
}

async function deserializeByHybird(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. get access token from header and get refresh token from cookie
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  const refreshToken = get(req, 'cookies.refreshToken');

  // 2. if accessToken not exist, return
  if (!accessToken) {
    return next();
  }

  // 3. verify access token
  const {decoded, expired} = verifyJwt(accessToken);
  // verify pass
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  // access token expire
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({refreshToken});
    if (newAccessToken) {
      // reissue new access token
      res.setHeader('x-access-token', newAccessToken);
      const {decoded} = verifyJwt(newAccessToken as string);
      res.locals.user = decoded;
    }
  }
  return next();
}


export default deserializeUser;