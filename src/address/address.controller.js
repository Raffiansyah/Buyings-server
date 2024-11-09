import { logger } from '../application/logger.js';
import {
  createNewAddress,
  deleteAddressById,
  getAddress,
  getAddressById,
  updateAddressById,
} from './address.services.js';

const timestamp = new Date().toISOString;

const getAllAddresss = async (req, res) => {
  const userId = req.userId
  try {
    const result = await getAddress(userId);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `AddressControler: Fail to get address: ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to get',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
};

const getAddressesById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId
  try {
    const result = await getAddressById(id, userId);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `AddressControler: Fail to get address: ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to get',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
};

const createAddress = async (req, res) => {
  const data = req.body;
  const userId = req.userId
  try {
    const result = await createNewAddress(data, userId);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `AddressControler: Fail to create address: ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to create',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
};

const updateAddress = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const result = await updateAddressById(id, data);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `AddressControler: Fail to update address: ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to update',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteAddressById(id);
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result,
      message: "success to delete",
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  } catch (error) {
    logger.error(
      `AddressControler: Fail to update address: ${error.message}`
    );
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Failed to delete',
      error: error.message,
      meta: {
        version: '1.0',
        timestamp: timestamp,
      },
    });
  }
};

export {
  getAllAddresss,
  getAddressesById,
  createAddress,
  updateAddress,
  deleteAddress,
};
