import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import {
  getAllAddresss,
  getAddressesById,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../address/address.controller.js';
import {
  getAllCart,
  createCarts,
  addedNewItemCarts,
  deletedCarts,
  deletedItemsCart,
} from '../cart/cart.controller.js';
import { upload } from '../lib/multer.js';
import { updateUser } from '../users/user.controller.js';

const CustRouter = express.Router();
CustRouter.use(authMiddleware);

//user
CustRouter.post('/user/update', upload.single('avatars'), updateUser)

//address
CustRouter.get('/address', getAllAddresss);
CustRouter.get('/address/:id', getAddressesById);
CustRouter.post('/address', createAddress);
CustRouter.patch('/address/:id', updateAddress);
CustRouter.delete('/address/:id', deleteAddress);

//cart
CustRouter.get('/cart', getAllCart);
CustRouter.post('/cart', createCarts);
CustRouter.patch('/cart/:id', addedNewItemCarts);
CustRouter.delete('/cart/:id', deletedCarts);
CustRouter.delete('/cart/item/:itemId', deletedItemsCart);

export { CustRouter };
