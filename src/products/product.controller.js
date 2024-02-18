import {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProductById,
  updateProductById,
} from './product.services.js';
import { ResponseError } from '../error/response-error.js';

const getProducts = async (req, res, next) => {
  try {
    const result = await getAllProducts();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  try {
    const result = await getProductById(req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const productData = req.body;
  try {
    if (
      !(
        productData.title &&
        productData.slug &&
        productData.description &&
        productData.prices &&
        productData.stock &&
        productData.images &&
        productData.categorySlug
      )
    ) {
      throw new ResponseError('Some Fields are missing');
    }
    const result = await createNewProduct(productData);
    res.send({
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductsById = async (req, res, next) => {
  try {
    await deleteProductById(req.params.id);
    res.send('Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

const updateProductsById = async (req, res, next) => {
  const productData = req.body;
  try {
    if (
      !(
        productData.title &&
        productData.prices &&
        productData.description &&
        productData.stock &&
        productData.slug &&
        productData.images &&
        productData.categorySlug
      )
    ) {
      throw new ResponseError('Some Fields are missing');
    }
    const product = await updateProductById(req.params.id, productData);
    res.send({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProductsById,
  createProduct,
  deleteProductsById,
  updateProductsById,
};
