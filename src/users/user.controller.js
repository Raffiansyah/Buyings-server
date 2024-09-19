import { decode } from 'base64-arraybuffer';
import userServices from './user.services.js';
import { logger } from '../application/logger.js';

const timestamp = new Date().toISOString;

//function to create admin
async function createAdmin(req, res) {
  const dataAdmin = req.body;
  try {
    const admin = await userServices.createAdmin(dataAdmin);
    logger.info(`UserController: Success to create Admin ${dataAdmin.email}`);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: admin,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `UserController: Fail to create Admin ${dataAdmin.email} because ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to create',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
}
//function to create user
async function createUser(req, res) {
  const dataUser = req.body;
  try {
    const { user } = await userServices.createUser(dataUser);
    logger.info(`UserController: Success to create User ${dataUser.email}`);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: user,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `UserController: Fail to create User ${dataUser.email} because ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to create',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
}

//function to update user
async function updateUser(req, res) {
  const userData = req.body;
  const file = req?.file?.buffer || null;
  try {
    let userAvatar = null
    if(file){
    userAvatar = decode(file.toString('base64'));
    }
    const userUpdated = await userServices.updateUser(userData, userAvatar);
    logger.info(`UserController: Success to update User ${userData.username}`);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: userUpdated,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `UserController: Fail to create User ${userData.username} because ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to update',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
}

//function to login
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
      .json({
        status: 'success',
        code: 200,
        data: user,
        accessToken: session.access_token,
        meta: {
          version: '1.0',
          timestamp: timestamp,
        },
      });
  } catch (error) {
    logger.error(
      `UserController: Error logging in user ${dataUser.email}: ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to login',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
}

async function logout(req, res) {
  try {
    await userServices.logout();
    logger.info(`UserController: User logged out successfully`);
    res.clearCookie('refreshToken').json({
      status: 'success',
      code: 200,
      message: 'GoodBay',
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(`UserController: Error logging out user: ${error.message}`);
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to logout',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
}

async function refreshSession(req, res) {
  const Token = req.cookies.refreshToken;
  try {
    const { session } = await userServices.refreshSession(Token);
    logger.info(`UserController: Session refreshed successfully`);
    res.json({
      status: 'success',
      code: 200,
      accessToken: session.access_token,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(`UserController: Error refreshing session: ${error.message}`);
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to refresh',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
}

async function verifyOTP(req, res) {
  const { hashToken } = req.body;
  try {
    await userServices.verifyOTP(hashToken);
    logger.info(`UserController: Verifying otp successfully`);
    res.json({
      status: 'success',
      code: 200,
      message: 'Verify otp success',
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(`UserController: failed to Verifying otp: ${error.message}`);
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to Verify',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
}

export {
  createAdmin,
  createUser,
  updateUser,
  login,
  logout,
  refreshSession,
  verifyOTP,
};
