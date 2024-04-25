import {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProductById,
  updateProductById,
} from './product.services.js';

const getProducts = async (req, res, next) => {
  try {
    const result = await getAllProducts();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getProductById(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const productData = req.body;
  try {
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
  const { id } = req.params;
  try {
    await deleteProductById(id);
    res.send('Product deleted successfully');
  } catch (error) {
    next(error);
  }
};

const updateProductsById = async (req, res, next) => {
  const productData = req.body;
  const { id } = req.params;
  try {
    const product = await updateProductById(id, productData);
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
