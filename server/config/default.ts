export default {
  port: 3000,
  origin: 'http://localhost:8080',
  dbURI: '',
  saltWorkFactor: 10,
  AuthModel: 2, //0 -- cookies, 1 -- token, 2 -- hybird
  accessTokenTtl: '15m',
  refreshTokenTtl: '7d',
  publicKey: ``,
  privateKey: ``
};