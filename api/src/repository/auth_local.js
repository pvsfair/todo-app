import {
  NotFoundError,
  UnableToLogin,
  UsernameAlreadyInUse,
  UserUnauthorized,
} from './errors.js';
import crypto from 'crypto';

let users = [
  {
    id: 1,
    username: 'pvsfair',
    password:
      '44fdaf0d3f0315d980fdfb3dff0289cda41d147e1b089e5865b0ba25d9f09320c0a5806856c200fb3d3e83c9461bd605c8dba5156eaadd1b63f310eeb2e8dc02',
    name: 'Paulo Alvares',
    salt: 'a205b177a388e5bda1df6814befbd20f',
    authHash: 'hash',
    authHashExpiration: Date.now(),
  },
];

const randomByteSize = 16;

function encrypt(hash, username) {
  const strToBase64 = `${hash}${username}`;
  const base64 = Buffer.from(strToBase64).toString('base64');
  return base64;
}

function decrypt(hash) {
  const hashUsername = Buffer.from(hash, 'base64').toString('ascii');
  const hashForDB = hashUsername.substring(0, randomByteSize * 2);
  const username = hashUsername.substring(randomByteSize * 2);
  return {
    username,
    hashForDB,
  };
}

function hashPassword(password, salt) {
  if (!salt) salt = crypto.randomBytes(16).toString('hex');

  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

  return {
    salt,
    hash,
  };
}

function validateHash(hash) {
  const { username, hashForDB } = decrypt(hash);

  const userFound = users.find((user) => user.username === username);
  if (!userFound) {
    throw new NotFoundError('User', hash, 'hash');
  }
  if (userFound.authHash !== hashForDB || userFound.authHashExpiration < Date.now()) {
    throw new UserUnauthorized(username);
  }
  return userFound;
}

function getUser(username) {
  const user = users.find((user) => user.username === username);

  return user;
}

function availableUsername(username) {
  const userExists = getUser(username);
  if (!!userExists) throw new UsernameAlreadyInUse(username);
  return !!userExists;
}

function registerUser(userData) {
  const { salt, hash } = hashPassword(userData.password);

  const newUser = {
    id: users.length + 1,
    ...userData,
    password: hash,
    salt,
    authHash: null,
    authHashExpiration: Date.now(),
  };
  users.push(newUser);
  console.log(newUser);
}

function getExpirationHashDate() {
  const now = new Date();
  now.setHours(now.getHours() + 6);
  return now.getTime();
}

function loginUser(userData) {
  const user = getUser(userData.username);
  if (!user) throw new UnableToLogin();
  const { hash: hashPass } = hashPassword(userData.password, user.salt);
  if (user.password !== hashPass) throw new UnableToLogin();
  const { username, name } = user;
  const hashForDB = crypto.randomBytes(randomByteSize).toString('hex');
  const hashForUser = encrypt(hashForDB, user.username);

  user.authHash = hashForDB;
  user.authHashExpiration = getExpirationHashDate();

  return { username, name, hash: hashForUser };
}

function logoutUser(username) {
  const user = getUser(username);
  user.authHash = '';
  user.authHashExpiration = Date.now();
}

export default {
  validateHash,
  registerUser,
  availableUsername,
  loginUser,
  logoutUser,
};
