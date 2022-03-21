import { Router } from 'express';
import {
  login,
  logout,
  register,
  validateHash,
} from '../controllers/authController.js';
import auth from '../middlewares/authentication.js';

const routes = Router({ mergeParams: true });

routes.post('/login', login);
routes.post('/logout', auth, logout);
routes.post('/register', register);
routes.get('/validate', auth, validateHash);

export default routes;
