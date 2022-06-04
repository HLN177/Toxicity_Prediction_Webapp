import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

// sign jwt with private key
function signJwt(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, {
    ...(options && options),// check options is defined before spread
    algorithm: 'RS256'
  });
}

// verify jwt with public
function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null
    };
  }
}

export {
  signJwt,
  verifyJwt
}