import authRepo from '../repository/auth_local.js';
import { NotFoundError, UserUnauthorized } from '../repository/errors.js';

const authenticationMiddleware = (req, res, next) => {
  const userHash = req.header('Authorization');
  if (!userHash) {
    res.sendStatus(401);
    return;
  }
  try {
    const user = authRepo.validateHash(userHash);
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof UserUnauthorized) {
      return res.status(401).send(err.message);
    }
    return res.status(400).send(err.message);
  }
};

export default authenticationMiddleware;
