import express from 'express';
import { roleMiddleware } from '../middleware/role-middleware.js';
import {
  createProduct,
  deleteProductsById,
  updateProductsById,
} from '../products/product.controller.js';
import {
  createCategories,
  deleteCategories,
  updateCategories,
} from '../categories/category.controler.js';
import {
  createCoupon,
  deleteCoupon,
  updateCoupon,
} from '../coupon/coupon.controler.js';
// import { registerAdmins } from '../users/user.controller.js'  

const AdminRouter = express.Router();
AdminRouter.use(roleMiddleware);

//product
AdminRouter.post('/products', createProduct);
AdminRouter.patch('/products/:id', updateProductsById);
AdminRouter.delete('/products/:id', deleteProductsById);

//category
AdminRouter.post('/category', createCategories);
AdminRouter.delete('/category/:slug', deleteCategories);
AdminRouter.patch('/category/:slug', updateCategories);

//coupon
AdminRouter.post('/coupon', createCoupon);
AdminRouter.delete('/coupon/:id', deleteCoupon);
AdminRouter.patch('/coupon/:id', updateCoupon);

//admin
// AdminRouter.post('/admin', registerAdmins)

export { AdminRouter };
