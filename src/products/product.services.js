import {
  isProductExist,
  findProducts,
  findProductsId,
  createProduct,
  deleteProduct,
  updateProduct,
} from './product.repository.js';
import { ResponseError } from '../error/response-error.js';
import {
  createProductValidation,
  updateProductValidation,
} from '../validation/productsValidation.js';

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

const createNewProduct = async (product, productImages) => {
  const ProductExist = await isProductExist(product.slug);
  const validate = createProductValidation(product);
  if (validate.error) {
    throw new ResponseError(validate.error.message);
  } else if (ProductExist) {
    throw new ResponseError('Product is Exist');
  }
  const createdProduct = await createProduct(product, productImages);
  return createdProduct;
};

const deleteProductById = async (id, imagePath) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ResponseError('Product not found');
  }
  const deletedProduct = await deleteProduct(id, imagePath);
  return deletedProduct;
};

const updateProductById = async (id, productData) => {
  const product = await getProductById(id);
  const validate = updateProductValidation(productData);
  if (!product) {
    throw new ResponseError('Product not found');
  } else if (validate.error) {
    throw new ResponseError(validate.error.message);
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
