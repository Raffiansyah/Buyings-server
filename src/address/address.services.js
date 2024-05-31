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
    return 'Address not found';
  }
  return address;
};

const getAddress = async (userId) => {
  const address = await findAddress(userId);
  if (!address) {
    return 'Address not found';
  }
  return address;
};

const createNewAddress = async (data) => {
  const validate = createAddressValidation(data);
  if (validate.error) {
    return validate.error.message;
  }
  const newAddress = await createAddress(data);
  return newAddress;
};

const updateAddressById = async (id, data) => {
  const address = getAddressById(id);
  const validate = updateAddressValidation(data);
  if (!address) {
    return 'Address not found';
  } else if (validate.error) {
    return validate.error.message;
  }
  const updatedAddress = await updateAddress(id, data);
  return updatedAddress;
};

const deleteAddressById = async (id) => {
  const address = getAddressById(id);
  if (!address) {
    return 'Address not found';
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
