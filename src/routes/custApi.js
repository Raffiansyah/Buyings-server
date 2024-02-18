import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import {
  getAllAddresss,
  getAddressesById,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../address/address.controller.js';

const CustRouter = express.Router();
CustRouter.use(authMiddleware);

CustRouter.get('/address', getAllAddresss);
CustRouter.get('/address/:id', getAddressesById);
CustRouter.post('/address', createAddress);
CustRouter.patch('/address/:id', updateAddress);
CustRouter.delete('/address/:id', deleteAddress);

export { CustRouter };
