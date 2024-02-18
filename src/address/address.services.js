import {
  createAddress,
  findAddress,
  findAddressById,
  deleteAddress,
  updateAddress,
} from './address.repository.js';
import { ResponseError } from '../error/response-error.js';

const getAddressById = async (id) => {
  const address = await findAddressById(id);
  if (!address) {
    throw new ResponseError('Address not found');
  }
  return address;
};

const getAddress = async () => {
  const address = await findAddress();
  if (!address) {
    throw new ResponseError('Address not found');
  }
  return address;
};

const createNewAddress = async (data) => {
  const newAddress = await createAddress(data);
  return newAddress;
};

const updateAddressById = async (id, data) => {
  const address = getAddressById(id);
  if (!address) {
    throw new ResponseError('Address not found');
  }
  const updatedAddress = await updateAddress(id, data);
  return updatedAddress;
};

const deleteAddressById = async (id) => {
  const address = getAddressById(id);
  if (!address) {
    throw new ResponseError('Address not found');
  }
  const deletedAddress = await deleteAddress(id);
  return deletedAddress;
};

export {
  getAddress,
  getAddressById,
  createNewAddress,
  updateAddressById,
  deleteAddressById,
}