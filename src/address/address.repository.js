import { prisma } from '../application/databases.js';

const findAddress = async (userId) => {
  const address = await prisma.address.findMany({
    where: {
      userId
    }
  });
  return address;
};

const findAddressById = async (id, userId) => {
  const address = await prisma.address.findUnique({
    where: {
      id,
      userId
    },
  });
  return address;
};

const createAddress = async (data) => {
  const address = await prisma.address.create({
    data: data,
  });
  return address;
};

const updateAddress = async (id, data) => {
  const updatedAddress = await prisma.address.update({
    where: {
      id: id,
    },
    data: data,
  });
  return updatedAddress;
};

const deleteAddress = async (id) => {
  const deletedAddress = await prisma.address.delete({
    where: {
      id: id,
    },
  });
  return deletedAddress;
};

export {
  createAddress,
  findAddress,
  findAddressById,
  updateAddress,
  deleteAddress,
};
