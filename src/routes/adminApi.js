import express from 'express';
import { upload } from '../lib/multer.js';
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

const AdminRouter = express.Router();
AdminRouter.use(roleMiddleware);

//product
AdminRouter.post('/products', upload.single('productImages'), createProduct);
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

export { AdminRouter };
