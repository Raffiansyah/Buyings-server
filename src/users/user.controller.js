import { decode } from 'base64-arraybuffer';
import userServices from './user.services.js';
import { logger } from '../application/logger.js';

//function to create admin
async function createAdmin(req, res) {
  const dataAdmin = req.body;
  try {
    const admin = await userServices.createAdmin(dataAdmin);
    logger.info(`UserController: Success to create Admin ${dataAdmin.email}`);
    res.status(200).send({ admin });
  } catch (error) {
    logger.error(
      `UserController: Fail to create Admin ${dataAdmin.email} because ${error.message}`
    );
    res.status(400).send({ message: error.message });
  }
}

async function createUser(req, res) {
  const dataUser = req.body;
  try {
    const user = await userServices.createUser(dataUser);
    logger.info(`UserController: Success to create User ${dataUser.email}`);
    res.status(200).send({ user });
  } catch (error) {
    logger.error(
      `UserController: Fail to create User ${dataUser.email} because ${error.message}`
    );
    res.status(400).send({ message: error.message });
  }
}

async function updateUser(req, res) {
  const file = req.file.buffer;
  const userData = req.body;
  try {
    const userAvatar = decode(file.toString('base64'));
    const userUpdated = await userServices.updateUser(userData, userAvatar);
    logger.info(`UserController: Success to update User ${userData.username}`);
    res.status(200).send({ userUpdated });
  } catch (error) {
    logger.error(
      `UserController: Fail to create User ${userData.username} because ${error.message}`
    );
    res.status(400).send({ message: error.message });
  }
}

async function login(req, res) {
  const dataUser = req.body;
  try {
    const { user, session } = await userServices.login(dataUser);
    logger.info(`UserController: User ${user.email} logged in successfully`);
    res
      .cookie('refreshToken', session.refresh_token, {
        maxAge: session.expires_in,
        httpOnly: true,
        // secure: true
      })
      .send({ data: user, accessToken: session.access_token });
  } catch (error) {
    logger.error(
      `UserController: Error logging in user ${dataUser.email}: ${error.message}`
    );
    res.status(400).send({ message: error.message });
  }
}

async function logout(req, res) {
  try {
    await userServices.logout();
    logger.info(`UserController: User logged out successfully`);
    res.clearCookie('refreshToken').send({ message: 'Goodbay' });
  } catch (error) {
    logger.error(`UserController: Error logging out user: ${error.message}`);
    res.status(400).send({ message: error.message });
  }
}

async function refreshSession(req, res) {
  const Token = req.cookies.refreshToken;
  try {
    const { session } = await userServices.refreshSession(Token);
    logger.info(`UserController: Session refreshed successfully`);
    res.send({ accessToken: session.access_token });
  } catch (error) {
    logger.error(`UserController: Error refreshing session: ${error.message}`);
    res.status(400).send({ message: error.message });
  }
}

export { createAdmin, createUser, updateUser, login, logout, refreshSession };
