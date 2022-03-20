export class NotFoundError extends Error {
  constructor(name, param, parameter = 'id') {
    super(`${name} not found for ${parameter} ${param}`);
  }
}

export class UserUnauthorized extends Error {
  constructor(username) {
    super(`User "${username}" unauthorized, please reauthenticate`);
  }
}

export class UsernameAlreadyInUse extends Error {
  constructor(username) {
    super(`Username "${username}" already in use`);
  }
}

export class UnableToLogin extends Error {
  constructor() {
    super(`User not found or incorrect password`);
  }
}
