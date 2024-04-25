import { prisma } from '../application/databases.js';
import { midtransParameter, midtransSnap } from '../lib/midtrans.js';
import { createOrderId } from '../lib/nanoId.js';

const findAllTransaction = async (userId) => {
  const transaction = await prisma.order.findMany({
    where: {
      userId,
    },
  });
  return transaction;
};

const findUniqueTransaction = async (userId, status) => {
  const transaction = await prisma.order.findMany({
    where: {
      userId,
      transactionStatus: status,
    },
  });
  return transaction;
};

const createTransaction = async ({ userId, username, email }) => {
  const products = await prisma.cart.findMany({
    where: { id: { in: userId } },
  });
  const gross_amount = products.reduce(
    (product) => product.quantity * product.price
  );
  const payment = await midtransSnap.createTransaction(
    midtransParameter(products, createOrderId, gross_amount, username, email)
  );
  const transaction = await prisma.order.create({
    data: {
      id: createOrderId,
      userId: userId,
      totalPrice: gross_amount,
      transactionStatus: 'PENDING',
      token: payment.token,
      orderItems: {
        create: products.map((product) => ({
          product: {
            connect: {
              id: product.id
            },
          },
        })),
      },
    },
  });
};

export {}