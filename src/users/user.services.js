import { ResponseError } from '../error/response-error.js';
import { createAdminValidation, createUserValidation } from '../validation/userValidation.js';
import { createUsers, createAdmin, login, logout } from './user.repository.js';

const registerUser = async (user) => {
  const validate = createUserValidation(user)
  if(validate.error){
    throw new ResponseError(validate.error.message)
  }
  const registeredUser = await createUsers(user);
  return registeredUser;
};

const registerAdmin = async (user) => {
  const validate = createAdminValidation(user)
  if(validate.error){
    throw new ResponseError(validate.error.message)
  }
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

export { registerUser, registerAdmin, loginUser, logoutUser };
