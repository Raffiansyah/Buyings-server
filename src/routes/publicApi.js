import express from 'express';
import {
  getProducts,
  getProductsById,
} from '../products/product.controller.js';
import {
  registerUsers,
  loginUsers,
  logoutUsers,
  getUsers,
} from '../users/user.controller.js';
import {
  getAllCategories,
  getCategoriesByUnique,
} from '../categories/category.controler.js';

import {
  getAllCoupons,
  getCouponByUnique,
} from '../coupon/coupon.controler.js';

import { registerAdmins } from '../users/user.controller.js';

const publicRouter = express.Router();
publicRouter.get('/', (req, res) => res.send('Under construction 👷🏼‍♂️👷🏼'));
//product
publicRouter.get('/products', getProducts);
publicRouter.get('/products/:id', getProductsById);

//user
publicRouter.post('/users/register', registerUsers);
publicRouter.post('/users/login', loginUsers);
publicRouter.post('/users/logout', logoutUsers);
publicRouter.get('/users', getUsers)

//category
publicRouter.get('/category', getAllCategories);
publicRouter.get('/category/:slug', getCategoriesByUnique);

//coupon
publicRouter.get('/coupon', getAllCoupons);
publicRouter.get('/coupon/:id', getCouponByUnique);

//admin
publicRouter.post('/admin', registerAdmins);

export { publicRouter };
