import express from 'express';
import { serve, setup } from 'swagger-ui-express'
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
import { createUser, login, logout, refreshSession, verifyOTP } from '../users/user.controller.js';
import { specs } from '../lib/swagger.js';

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => res.send('Under construction 👷🏼‍♂️👷🏼'));

//docs
publicRouter.use('/docs', serve, setup(specs))

//user
publicRouter.post('/register', createUser)
publicRouter.post('/login', login)
publicRouter.post('/logout', logout)
publicRouter.post('/user/verifyOTP', verifyOTP)
publicRouter.get('/user/refresh-session', refreshSession)

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
