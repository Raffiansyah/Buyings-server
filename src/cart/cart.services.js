import {
  findCart,
  createCart,
  addItemCart,
  deleteCart,
  deleteItemCart,
} from './cart.repository.js';
import { ResponseError } from '../error/response-error.js';
import {
  CartItemsValidation,
  userIdValidation,
} from '../validation/cartValidation.js';

const getCart = async (userId) => {
  const cart = await findCart(userId);
  if (!cart) {
    throw new ResponseError('Empty Cart');
  }
  return cart;
};

const createNewCart = async (userId, products) => {
  const userIdValidate = userIdValidation(userId);
  const cartItemValidate = CartItemsValidation(products);
  if (userIdValidate.error) {
    throw new ResponseError(`userIdError ${userIdValidate.error.message}`);
  } else if (cartItemValidate.error) {
    throw new ResponseError(`cartItemError ${cartItemValidate.error.message}`);
  }
  const cart = await createCart(userId, products);
  return cart;
};

const addNewItemCart = async (cartId, products) => {
  const validate = CartItemsValidation(products);
  if (validate.error) {
    throw new ResponseError(validate.error.message);
  }
  const cart = await addItemCart(cartId, products);
  return cart;
};

const deleteAllCart = async (cartId) => {
  const cart = await deleteCart(cartId);
  return cart;
};

const deleteItemsCart = async (cartItemId) => {
  const item = await deleteItemCart(cartItemId);
  return item;
};

export {
  getCart,
  createNewCart,
  addNewItemCart,
  deleteAllCart,
  deleteItemsCart,
};
