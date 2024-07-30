import express from 'express';
import {
  getProducts,
  getProductsById,
} from '../products/product.controller.js';
import {
  getAllCategories,
  getCategoriesByUnique,
} from '../categories/category.controler.js';

import {
  getAllCoupons,
  getCouponByUnique,
} from '../coupon/coupon.controler.js';

const publicRouter = express.Router();

//product
publicRouter.get('/products', getProducts);
publicRouter.get('/products/:id', getProductsById);

//category
publicRouter.get('/category', getAllCategories);
publicRouter.get('/category/:slug', getCategoriesByUnique);

//coupon
publicRouter.get('/coupon', getAllCoupons);
publicRouter.get('/coupon/:id', getCouponByUnique);

export { publicRouter };
