import { ResponseError } from '../error/response-error.js';
import {
  createNewAddress,
  deleteAddressById,
  getAddress,
  getAddressById,
  updateAddressById,
} from './address.services.js';

const getAllAddresss = async (req, res, next) => {
  try {
    const result = await getAddress();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getAddressesById = async (req, res, next) => {
  try {
    const result = await getAddressById(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  const data = req.body;
  try {
    if (
      !(
        data.street &&
        data.city &&
        data.country &&
        data.postalCode &&
        data.province &&
        data.userId
      )
    ) {
      throw new ResponseError('some fields are missing');
    }
    const result = await createNewAddress(data);
    res.send({
      message: 'Address created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  const data = req.body;
  try {
    if (
      !(
        data.street &&
        data.city &&
        data.country &&
        data.postalCode &&
        data.province &&
        data.userId
      )
    ) {
      throw new ResponseError('some fields are missing');
    }
    const result = await updateAddressById(req.params.id, data);
    res.send({
      message: 'Address updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const result = await deleteAddressById(req.params.id);
    res.send({
      message: 'Address deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllAddresss,
  getAddressesById,
  createAddress,
  updateAddress,
  deleteAddress,
};
