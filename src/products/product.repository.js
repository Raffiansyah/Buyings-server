import { prisma } from '../application/databases.js';

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductsId = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const createProduct = async (product) => {
  const createdProduct = await prisma.product.create({ data: product });
  return createdProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });
  return deletedProduct;
};

const updateProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id
    },
    data: productData,
  });
  return product;
};

export { findProducts, findProductsId, createProduct, deleteProduct, updateProduct };
