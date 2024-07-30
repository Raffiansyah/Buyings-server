import { logger } from '../application/logger.js';
import {
  createAdminValidation,
  createUserValidation,
} from '../validation/userValidation.js';
import userRepository from './user.repository.js';

export default new (class UserServices {
  //service function to create admin
  async createAdmin(user) {
    try {
      const validate = createAdminValidation(user);
      if (validate.error) {
        logger.error(`validation service error: ${validate.error.message}`);
        throw new Error(validate.error.message);
      }
      const data = await userRepository.createAdmin(user);
      logger.info(`UserService: Success to create admin ${data.user.email}`);
      return data;
    } catch (error) {
      logger.error(
        `UserService: Failed to create admin ${user.email}: ${error.message}`
      );
      throw new Error(error.message);
    }
  }

  //service function to create user
  async createUser(user) {
    try {
      const validate = createUserValidation(user);
      if (validate.error) {
        logger.error(`validation service error: ${validate.error.message}`);
        throw new Error(validate.error.message);
      }
      const data = await userRepository.createUser(user);
      logger.info(`UserService: Success to create user ${data.user.email}`);
      return data;
    } catch (error) {
      logger.error(
        `UserService: Failed to create user ${user.email}: ${error.message}`
      );
      throw new Error(error.message);
    }
  }

  //service function to update user
  async updateUser(user, userAvatar) {
    try {
      const avatarUrl = await userRepository.uploadAvatar(userAvatar);
      user.avatar_url = avatarUrl.path;
      const data = await userRepository.updateUser(user);
      logger.info(`UserService: Success to update user ${data.user.email}`);
      return data;
    } catch (error) {
      logger.error(
        `UserService: Failed to update user ${user.email} because ${error.message}`
      );
      throw new Error(error.message);
    }
  }

  //service function to login user
  async login(user) {
    try {
      const data = await userRepository.login(user);
      logger.info(
        `UserService: User ${data.user.email} logged in successfully`
      );
      return data;
    } catch (error) {
      logger.error(
        `UserService: Failed logging in user ${user.email} because ${error.message}`
      );
      throw new Error(error.message);
    }
  }

  //service function to logout user
  async logout() {
    try {
      await userRepository.logout();
      logger.info(`UserService: User logged out successfully`);
    } catch (error) {
      logger.error(`UserService: Failed to logged out user`);
      throw new Error(error.message);
    }
  }

  async refreshSession(refreshToken) {
    try {
      const data = await userRepository.refreshSession(refreshToken);
      logger.info(`UserService: Session refreshed successfully`);
      return data;
    } catch (error) {
      logger.error(`UserService: Error refreshing session: ${error.message}`);
      throw new Error(error.message);
    }
  }
})();
