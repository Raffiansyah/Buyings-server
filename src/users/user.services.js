import {
  createAdminValidation,
  createUserValidation,
} from '../validation/userValidation.js';
import { createUsers, createAdmin, login, logout } from './user.repository.js';

const registerAdmin = async (user) => {
  const validate = createAdminValidation(user);
  if (validate.error) {
    throw new Error(validate.error.message);
  }
  const newUser = await createAdmin(user);
  return newUser;
};

const registerUser = async (user) => {
  const validate = createUserValidation(user);
  if (validate.error) {
    throw new Error(validate.error.message);
  }
  const newUser = await createUsers(user);
  return newUser;
};

const loginUser = async (user) => {
  const dataUser = await login(user);
  return dataUser;
};

const logoutUser = async () => {
  await logout();
};

export { registerUser, registerAdmin, loginUser, logoutUser };
