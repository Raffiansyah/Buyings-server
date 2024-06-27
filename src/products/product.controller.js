import {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProductById,
  updateProductById,
} from './product.services.js';
import { decode } from 'base64-arraybuffer';

const getProducts = async (req, res) => {
  const { Page, Search, Category, sort_by } = req.query;
  try {
    const result = await getAllProducts(Search, Page, Category, sort_by);
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const { products, totalPage, totalRows, limit, page } =
      await getProductById(id);
    res.json({
      page,
      products,
      limit,
      totalRows,
      totalPage,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createProduct = async (req, res) => {
  const productData = req.body;
  const file = req.file.buffer;
  try {
    const productImages = decode(file.toString('base64'));
    const result = await createNewProduct(productData, productImages);
    res.send({
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProductsById = async (req, res) => {
  const { id } = req.params;
  const { imagePath } = req.body;
  try {
    await deleteProductById(id, imagePath);
    res.send('Product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProductsById = async (req, res) => {
  const productData = req.body;
  const { id } = req.params;
  try {
    const product = await updateProductById(id, productData);
    res.send({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export {
  getProducts,
  getProductsById,
  createProduct,
  deleteProductsById,
  updateProductsById,
};
