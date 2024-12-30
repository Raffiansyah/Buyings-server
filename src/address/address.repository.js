import { prisma } from '../application/databases.js';

const findAddress = async (userId) => {
  const address = await prisma.address.findMany({
    where: {
      userId,
    },
  });
  return address;
};

const findAddressById = async (id) => {
  const address = await prisma.address.findUnique({
    where: {
      id,
    },
  });
  return address;
};

const createAddress = async (data, userId) => {
  const address = await prisma.address.create({
    data: {
      userId,
      label: data.label,
      street: data.street,
      province: data.province,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode,
    },
  });
  return address;
};

const updateAddress = async (id, data, userId) => {
  const updatedAddress = await prisma.address.update({
    where: {
      id: id,
    },
    data: {
      userId,
      label: data.label,
      street: data.street,
      province: data.province,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode,
    },
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
