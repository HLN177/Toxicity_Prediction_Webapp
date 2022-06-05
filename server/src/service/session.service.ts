import config from 'config';
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, {SessionDocument} from '../models/session.model';
import { verifyJwt } from '../utils/jwt.utils';
import { findUser } from "./user.service";
import { signJwt } from "../utils/jwt.utils";

/**
 * create session
 * @param userId 
 * @param userAgent browers info
 * @returns 
 */
async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({user: userId, userAgent});
  return session.toJSON();
}

/**
 * get session info from db
 * @param query user id
 * @returns 
 */
async function findSessions(query: FilterQuery<SessionDocument>) {
  // .lean just return a plain object
  return SessionModel.find(query).lean();
}

/**
 * update session (could use for delete approach)
 * @param query 
 * @param update 
 * @returns 
 */
async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

/**
 * reissue new access token
 * 1. validate refresh token
 * 2. validate session (it will be invalid when you logout)
 * 3. validate user
 * 4. create new access token
 * @param refreshToken
 * @returns 
 */
async function reIssueAccessToken(
  {refreshToken} : {refreshToken: string}
) {
  // 1. validate refresh token
  const {decoded} = verifyJwt(refreshToken);
  // _id in decoded is the user id!
  if (!decoded || !get(decoded, 'session')) {
    return false;
  }
  // 2. validate session
  const session = await SessionModel.findById(get(decoded, 'session'));
  // _id in decoded is the user id! should use 'session'
  // const session = await SessionModel.findById(get(decoded, '_id'));

  // if the session has been set is valid: false, do not issue a new access token
  if (!session || !session.valid) {
    return false;
  }

  // 3. validate user
  const user = await findUser({_id: session.user});

  if (!user) {
    return false;
  }

  // 4. create new access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  );

  return accessToken;
}

export {
  createSession,
  findSessions,
  updateSession,
  reIssueAccessToken
};