import {
  registerUser,
  registerAdmin,
  loginUser,
  logoutUser,
} from './user.services.js';

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
    res.cookie('token', users.data.session.access_token, {
      maxAge: users.data.session.expires_in,
      httpOnly: true,
      // secure: true,
    }).json({
      message: 'Welcome 🤘🏼🤘🏼',
      data: users.data.user
    });
  } catch (error) {
    next(error);
  }
};

const logoutUsers = async (req, res, next) => {
  try {
    await logoutUser();
    res.clearCookie('token').json({ message: 'Good Bye 👋🏼👋🏼'})
  } catch (error) {
    next(error);
  }
};

export { registerUsers, registerAdmins, loginUsers, logoutUsers };
