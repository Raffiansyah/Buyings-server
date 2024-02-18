import {
  createNewCoupon,
  getAllCoupon,
  getCouponById,
  updateCouponById,
  deleteCouponById,
} from './coupon.services.js';
import { ResponseError } from '../error/response-error.js';

const getAllCoupons = async (req, res, next) => {
  try {
    const result = await getAllCoupon();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getCouponByUnique = async (req, res, next) => {
  try {
    const result = await getCouponById(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createCoupon = async (req, res, next) => {
  const data = req.body;
  try {
    if (!(data.code && data.discount && data.percentage)) {
      throw new ResponseError('All fields are required');
    }
    const result = await createNewCoupon(data);
    res.send({
      message: 'Coupon created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCoupon = async (req, res, next) => {
  const data = req.body;
  try {
    if (!(data.code && data.discount && data.percentage)) {
      throw new ResponseError('All fields are required');
    }
    const result = await updateCouponById(req.params.id, req.body);
    res.send({
      message: 'Coupon updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
    const result = await deleteCouponById(req.params.id);
    res.send({
      message: 'Coupon deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCoupons,
  getCouponByUnique,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
