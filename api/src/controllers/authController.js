import { UnableToLogin, UsernameAlreadyInUse } from '../repository/errors.js';
import { validateUser, validateUserLogin } from '../validators/user.js';
import authRepo from '../repository/auth_local.js';

export const login = (req, res) => {
  const data = req.body;

  try {
    validateUserLogin(data);
    const authHash = authRepo.loginUser(data);

    res.status(200).json({ authHash });
  } catch (err) {
    if (err instanceof UnableToLogin) return res.status(400).send(err.message);
    return res.status(400).send(err.message);
  }
};

export const logout = (req, res) => {
  authRepo.logoutUser(req.user.username);
  return res.sendStatus(200);
};

export const register = (req, res) => {
  const data = req.body;

  try {
    validateUser(data);
    authRepo.availableUsername(data.username);
    authRepo.registerUser(data);
    res.sendStatus(201);
  } catch (err) {
    if (err instanceof UsernameAlreadyInUse) return res.status(400).send(err.message);
    return res.status(400).send(err);
  }
};

export const validateHash = (req, res) => {
  res.send({ username: req.user.username, name: req.user.name });
};
