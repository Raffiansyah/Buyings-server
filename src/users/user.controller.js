import {
  getAllUsers,
  registerUser,
  registerAdmin,
  loginUser,
  logoutUser,
} from './user.services.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users.data);
  } catch (error) {
    next(error);
  }
};

const registerAdmins = async (req, res, next) => {
  try {
    const admin = await registerAdmin(req.body);
    res.send({ message: 'Admin created', data: admin });
  } catch (error) {
    next(error);
  }
};

const registerUsers = async (req, res, next) => {
  try {
    const users = await registerUser(req.body);
    res.send({ message: 'User created', data: users.data });
  } catch (error) {
    next(error);
  }
};

const loginUsers = async (req, res, next) => {
  try {
    const users = await loginUser(req.body);
    res.send({
      message: 'Welcome 🤘🏼🤘🏼',
      token: users.data.session.access_token,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUsers = async (req, res, next) => {
  try {
    const users = await logoutUser();
    res.send('Good Bye 👋🏼👋🏼');
  } catch (error) {
    next(error);
  }
};

export { getUsers, registerUsers, registerAdmins, loginUsers, logoutUsers };
