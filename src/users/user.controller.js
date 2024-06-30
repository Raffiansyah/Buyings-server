import { decode } from 'base64-arraybuffer';
import {
  registerUser,
  registerAdmin,
  loginUser,
  logoutUser,
  updateUsers,
} from './user.services.js';

const registerAdmins = async (req, res) => {
  const dataUser = req.body;
  try {
    const newUser = await registerAdmin(dataUser);
    res.send({ message: 'Admin created', data: newUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const registerUsers = async (req, res) => {
  const dataUser = req.body;
  try {
    const newUser = await registerUser(dataUser);
    res.send({ message: 'User created', data: newUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatedUsers = async (req, res) => {
  const file = req.file.buffer;
  const userData = req.body;
  try {
    const userImage = decode(file.toString('base64'));
    const upUser = await updateUsers(userData, userImage);
    res.send({ message: 'User Updated', data: upUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const loginUsers = async (req, res) => {
  const dataUser = req.body;
  try {
    const user = await loginUser(dataUser);
    res
      .cookie('token', user.session.access_token, {
        maxAge: user.session.expires_in,
        httpOnly: true,
        // secure: true,
      })
      .json({
        message: 'Welcome 🤘🏼🤘🏼',
        data: user.user,
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logoutUsers = async (req, res) => {
  try {
    await logoutUser();
    res.clearCookie('token').json({ message: 'Good Bye 👋🏼👋🏼' });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { registerUsers, registerAdmins, loginUsers, logoutUsers, updatedUsers };
