import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config';

/**
 * create user session
 * 1. validate user's password
 * 2. create a sesion
 * 3. create an access token
 * 4. create a refresh token
 * 5. return access & refresh tokens
 * @param req 
 * @param res 
 * @returns 
 */
async function createUserSessionHandler(
  req: Request,
  res: Response
) {
  // 1. validate user's password
  const user =  await validatePassword(req.body);
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  // 2. create a sesion
  const session = await createSession(user._id, req.get('user-agent') || '')

  // 3. create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  );

  // 4. create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('refreshTokenTtl') } // 1 year
  );

  res.cookie('accessToken', accessToken, {
    maxAge: 900000, // 15min
    /**
     * httpOnly
     * this cookie can only be accessed via http, and cannot access this via Javascript 
     * this is a good security feature that you get with cookies and don't get with local storage
     */
    httpOnly: true,
    domain: 'localhost', // set this in config in production
    path: '/', //	Path for the cookie
    sameSite: 'strict',
    secure: false // Marks the cookie to be used with HTTPS only.
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: 'localhost', // set this in config in production
    path: '/', //	Path for the cookie
    sameSite: 'strict',
    secure: false // Marks the cookie to be used with HTTPS only.
  });

  // 5. return access & refresh tokens
  return res.send({accessToken, refreshToken});
}

/**
 * find session info by user id in db
 * How to know the user id is? 
 * Ideallythe user will be on request object
 * middleware needed (deserializeUser)
 * @param req 
 * @param res 
 */
async function getUserSessionsHandler(
  req: Request,
  res: Response
) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({user: userId, valid: true});
  return res.send(sessions);
}

async function deleteUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = res.locals.user.session;
  const query = {
    _id: sessionId
  };
  const update = {
    valid: false // reIssueAccessToken function will check this property to determind if reIssue or not
  };
  await updateSession(query, update);

  return res.send({
    accessToken: null,
    refreshToken: null
  });
}

export {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteUserSessionHandler
};