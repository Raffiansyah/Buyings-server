import { supabase, supabaseAdmin } from '../lib/supabases.js';

const findUsers = async () => {
  const users = await supabase.auth.getUser();
  return users;
};

const createAdmin = async (user) => {
  const createAdmin = await supabaseAdmin.auth.admin.createUser({
    email: user.email,
    user_metadata: {
      username: user.username,
      avatar_url: user.avatar_url,
    },
    password: user.password,
    email_confirm: true,
    role: 'admin',
  });
  return createAdmin;
};

const createUsers = async (user) => {
  const createUsers = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    phone: user.phone,
    options: {
      data: {
        username: user.username,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
      },
    },
  });
  return createUsers;
};

const login = async (user) => {
  const loginUser = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  return loginUser;
};

const logout = async () => {
  const logoutUser = await supabase.auth.signOut();
  return logoutUser;
};

export { findUsers, createUsers, createAdmin, login, logout };
