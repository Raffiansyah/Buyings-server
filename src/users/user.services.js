import {
  findUsers,
  createUsers,
  createAdmin,
  login,
  logout,
} from './user.repository.js';

const getAllUsers = async () => {
  const users = await findUsers();
  return users;
};

const registerUser = async (user) => {
  const registeredUser = await createUsers(user);
  return registeredUser;
};

const registerAdmin = async (user) => {
  const registeredAdmin = await createAdmin(user);
  return registeredAdmin;
};

const loginUser = async (user) => {
  const loginUser = await login(user);
  return loginUser;
};

const logoutUser = async () => {
  await logout();
};

export { getAllUsers, registerUser, registerAdmin, loginUser, logoutUser };
