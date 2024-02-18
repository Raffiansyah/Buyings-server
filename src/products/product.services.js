import {
  findProducts,
  findProductsId,
  createProduct,
  deleteProduct,
  updateProduct,
} from './product.repository.js';
import { ResponseError } from '../error/response-error.js';

const getAllProducts = async () => {
  const products = await findProducts();
  if (!products) {
    throw new ResponseError('Products not found');
  }
  return products;
};

const getProductById = async (id) => {
  const product = await findProductsId(id);
  if (!product) {
    throw new ResponseError('Product not found');
  }
  return product;
};

const createNewProduct = async (product) => {
  const createdProduct = await createProduct(product);
  return createdProduct;
};

const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ResponseError('Product not found');
  }
  const deletedProduct = await deleteProduct(id);
  return deletedProduct;
};

const updateProductById = async (id, productData) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ResponseError('Product not found');
  }
  const updatedProduct = await updateProduct(id, productData);
  return updatedProduct;
};

export {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProductById,
  updateProductById,
};
