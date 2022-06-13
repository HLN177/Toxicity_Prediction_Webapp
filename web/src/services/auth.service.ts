import { SignInType } from '../models/signIn.model';
import { SignUpType } from '../models/signUp.model';
import service from '../utils/service';

const URL = {
  SESSION: '/api/sessions',
  USERS: '/api/users'
};

function signIn(data: SignInType) {
  return service.post(URL.SESSION,data);
}

function signUp(data: SignUpType) {
  return service.post(URL.USERS, data);
}

export {
  signIn,
  signUp
};