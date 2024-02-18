import {
  findCoupon,
  createCoupon,
  findCouponById,
  updateCoupon,
  deleteCoupon,
} from './coupon.repository.js';
import { ResponseError } from '../error/response-error.js';

const getAllCoupon = async () => {
  const coupon = await findCoupon();
  if (!coupon) {
    throw new ResponseError('Coupon not found');
  }
  return coupon;
};

const getCouponById = async (id) => {
  const coupon = await findCouponById(id);
  if (!coupon) {
    throw new ResponseError('Coupon not found');
  }
  return coupon;
};

const createNewCoupon = async (data) => {
  const newCoupon = await createCoupon(data);
  return newCoupon;
};

const updateCouponById = async (id, data) => {
  const coupon = await getCouponById(id);
  if (!coupon) {
    throw new ResponseError('Coupon not found');
  }
  const updatedCoupon = await updateCoupon(id, data);
  return updatedCoupon;
};

const deleteCouponById = async (id) => {
  const coupon = await getCouponById(id);
  if (!coupon) {
    throw new ResponseError('Coupon not found');
  }
  const deletedCoupon = await deleteCoupon(id);
  return deletedCoupon;
};

export {
  getAllCoupon,
  getCouponById,
  createNewCoupon,
  updateCouponById,
  deleteCouponById,
};
