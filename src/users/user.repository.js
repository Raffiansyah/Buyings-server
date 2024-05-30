import { supabase, supabaseAdmin } from '../lib/supabases.js';

const createAdmin = async (user) => {
  try {
    const { data } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      user_metadata: {
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url,
      },
      email_confirm: true,
      role: 'admin',
    });
    return data;
  } catch (error) {
    return error;
  }
};

const createUsers = async (user) => {
  try {
    const { data } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          avatar_url: user.avatar_url,
        },
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const login = async (user) => {
  try {
    const loginUser = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    return loginUser;
  } catch (error) {
    return error
  }
};

const logout = async () => {
  const logoutUser = await supabase.auth.signOut();
  return logoutUser;
};

export { createUsers, createAdmin, login, logout };
