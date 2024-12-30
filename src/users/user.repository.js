import { logger } from '../application/logger.js';
import { supabase, supabaseAdmin } from '../lib/supabases.js';

export default new (class UserRepository {
  //create admin function
  async createAdmin(user) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        user_metadata: {
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          avatar_url: "",
        },
        email_confirm: true,
        role: 'admin',
      });
      if (error) {
        logger.error(
          `UserRepository: Failed to creating an admin ${user.email} because ${error.message}`
        );
        throw new Error(`${error}`);
      }
      logger.info(`UserRepository: Success to creating admin ${user.email}`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //create user function
  async createUser(user) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            avatar_url: "",
          },
        },
      });
      if (error) {
        logger.error(
          `UserRepository: Failed to creating an user ${user.email} because ${error.message}`
        );
        throw new Error(`${error.message}`);
      }
      logger.info(`UserRepository: Success to creating user ${user.email}`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //function for upload user avatar
  async uploadAvatar(userAvatar) {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from('Avatars')
        .upload(`avatar/${Date.now()}`, userAvatar, { contentType: 'image/png' });
      if (error) {
        logger.error(
          `UserRepository: Failed to upload file because ${error.message}`
        );
        throw new Error(`${error.message}`);
      }
      logger.info(`UserRepository: Upload file successfully ${data.path}`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //function for update user
  async updateUser(user) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar_url: user.avatar_url,
        },
      });
      if (error) {
        logger.error(
          `UserRepository: Failed to update User ${user.username}: ${error.message}`
        );
        throw new Error(`${error.message}`);
      }
      logger.info(`UserRepository: Success to update User ${user.username}`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //funtion for user login/signIn
  async login(user) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) {
        logger.error(
          `UserRepository: Failed to signing in user ${user.email}: ${error.message}`
        );
        throw new Error(`${error.message}`);
      }
      logger.info(`UserRepository: User ${user.email} signed in successfully`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //funtion for user logout/signout
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        logger.error(
          `UserRepository: Failed to signing out user ${error.message}`
        );
        throw new Error(`${error.message}`);
      }
      logger.info(`UserRepository: User signed out successfully`);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //function to refresh session
  async refreshSession(refreshToken) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });
      if (error) {
        logger.error(
          `UserRepository: Failed to refresh session user because ${error.message}`
        );
        throw new Error(`${error.message}`);
      }
      logger.info(`UserRepository: success to refresh session`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //function to verifying otp
  async verifyOTP(hashToken) {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: hashToken,
        type: 'email',
      });
      if (error) {
        logger.error(
          `UserRepository: Failed to verify otp because ${error.message}`
        );
        throw new Error(`${error.message}`);
      }
      logger.info(`UserRepository: Success to verify otp`);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
})();
