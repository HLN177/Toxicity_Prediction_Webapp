import { SignInType, SignUpType, TokenResponse } from '../models/auth.models';
import service from '../utils/service';

const URL = {
  SESSION: '/api/sessions',
  USERS: '/api/users',
  ME: '/api/me'
};

function signIn(data: SignInType): Promise<TokenResponse> {
  return service.post(URL.SESSION, data);
}

function signUp(data: SignUpType) {
  return service.post(URL.USERS, data);
}

function checkAuth() {
  return service.get(URL.ME);
}

function signOut() {
  return service.delete(URL.SESSION);
}

export {
  signIn,
  signUp,
  checkAuth,
  signOut
};