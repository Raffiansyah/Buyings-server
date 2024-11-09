import {
  createAddress,
  findAddress,
  findAddressById,
  deleteAddress,
  updateAddress,
} from './address.repository.js';
import {
  createAddressValidation,
  updateAddressValidation,
} from '../validation/addressValidation.js';

const getAddressById = async (id, userId) => {
  const address = await findAddressById(id, userId);
  if (!address) {
    throw new Error('Address not found');
  }
  return address;
};

const getAddress = async (userId) => {
  const address = await findAddress(userId);
  if (!address) {
    throw new Error('Address not found');
  }
  return address;
};

const createNewAddress = async (data, userId) => {
  const validate = createAddressValidation(data);
  if (validate.error) {
    throw new Error(validate.error.message);
  }
  const newAddress = await createAddress(data, userId);
  return newAddress;
};

const updateAddressById = async (id, data, userId) => {
  const address = getAddressById(id);
  const validate = updateAddressValidation(data);
  if (!address) {
    throw new Error('Address not found');
  } else if (validate.error) {
    throw new Error(validate.error.message);
  }
  const updatedAddress = await updateAddress(id, data, userId);
  return updatedAddress;
};

const deleteAddressById = async (id) => {
  const address = getAddressById(id);
  if (!address) {
    throw new Error('Address not found');
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
};
