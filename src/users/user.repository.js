import { supabase, supabaseAdmin } from '../lib/supabases.js';

const createAdmin = async (user) => {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: user.email,
    password: user.password,
    user_metadata: {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      avatar_url: user.avatar_url,
    },
    email_confirm: true,
    role: 'admin',
  });
  if (error) {
    throw new Error(error);
  }
  return data;
};

const createUsers = async (user) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    },
  });
  if (error) {
    throw new Error(error);
  }
  return data;
};

const login = async (user) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    throw new Error(error);
  }
  return data;
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error);
  }
};

export { createUsers, createAdmin, login, logout };
