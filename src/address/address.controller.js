import {
  createNewAddress,
  deleteAddressById,
  getAddress,
  getAddressById,
  updateAddressById,
} from './address.services.js';

const getAllAddresss = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await getAddress(data.userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getAddressesById = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const result = await getAddressById(id, data.userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  const data = req.body;
  try {
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
  const { id } = req.params;
  try {
    const result = await updateAddressById(id, data);
    res.send({
      message: 'Address updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await deleteAddressById(id);
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
