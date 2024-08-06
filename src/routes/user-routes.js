import express from 'express';
import {
  createUser,
  login,
  logout,
  refreshSession,
  updateUser,
  verifyOTP,
} from '../users/user.controller.js';
import { upload } from '../lib/multer.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const routes = express.Router();

routes.get('/', (req, res) => res.send('Under construction 👷🏼‍♂️👷🏼'));

//user
routes.post('/register', createUser);
routes.post('/login', login);
routes.post(`/logout`, logout);
routes.get('/user/refresh-session', refreshSession);
routes.post('/user/verifyOTP', verifyOTP);
routes.post(
  '/user/update',
  authMiddleware,
  upload.single('avatars'),
  updateUser
);

export { routes };
