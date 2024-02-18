import { prisma } from '../application/databases.js';

const findCoupon = async () => {
  const coupon = await prisma.coupon.findMany();
  return coupon;
};

const findCouponById = async (id) => {
  const coupon = await prisma.coupon.findUnique({
    where: {
      id,
    },
  });
  return coupon;
};

const createCoupon = async (data) => {
  const coupon = await prisma.coupon.create({
    data,
  });
  return coupon;
};

const updateCoupon = async (id, data) => {
  const coupon = await prisma.coupon.update({
    where: {
      id,
    },
    data,
  });
  return coupon;
};

const deleteCoupon = async (id) => {
  const coupon = await prisma.coupon.delete({
    where: {
      id,
    },
  });
  return coupon;
};

export { findCoupon, findCouponById, createCoupon, updateCoupon, deleteCoupon };
