import {
  findCart,
  createCart,
  addItemCart,
  deleteCart,
  deleteItemCart,
} from './cart.repository.js';
import {
  CartItemsValidation,
  userIdValidation,
} from '../validation/cartValidation.js';

const getCart = async (userId) => {
  const cart = await findCart(userId);
  if (!cart) {
    return 'Empty Cart';
  }
  return cart;
};

const createNewCart = async (userId, products) => {
  const userIdValidate = userIdValidation(userId);
  const cartItemValidate = CartItemsValidation(products);
  if (userIdValidate.error) {
    return `userIdError ${userIdValidate.error.message}`;
  } else if (cartItemValidate.error) {
    return `cartItemError ${cartItemValidate.error.message}`;
  }
  const cart = await createCart(userId, products);
  return cart;
};

const addNewItemCart = async (cartId, products) => {
  const validate = CartItemsValidation(products);
  if (validate.error) {
    return validate.error.message;
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
