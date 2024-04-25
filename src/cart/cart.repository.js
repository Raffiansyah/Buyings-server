import { prisma } from '../application/databases.js';

const findCart = async (userId) => {
  const cart = await prisma.cart.findMany({
    where: {
      userId,
    },
    include: {
      CartItems: true,
    },
  });
  return cart;
};

const createCart = async (userId, products) => {
  const cart = await prisma.cart.create({
    data: {
      userId,
      CartItems: {
        create: products,
      },
    },
  });
  return cart;
};

const addItemCart = async (cartId, products) => {
  const cart = await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      CartItems: {
        create: products,
      },
    },
  });
  return cart;
};

const deleteCart = async (cartId) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: cartId },
  });
  for (const item of cartItems) {
    await prisma.cartItem.delete({ where: { id: item.id } });
  }
  const cart = await prisma.cart.delete({
    where: { id: cartId },
  });
  return cart;
};

const deleteItemCart = async (cartItemId) => {
  const item = await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
  return item;
};

export { findCart, createCart, addItemCart, deleteCart, deleteItemCart };
