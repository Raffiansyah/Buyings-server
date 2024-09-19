import productRepository from './product.repository.js';
import {
  createProductValidation,
  updateProductValidation,
} from '../validation/productsValidation.js';

export default new (class ProductServices {
  async getAllProducts(Search, Page, Category, Filter) {
    const { products, totalPage, totalRows, limit, page } =
      await productRepository.findProducts(Search, Page, Category, Filter);
    if (!products) {
      throw new Error('Products not found');
    }
    return { products, totalPage, totalRows, limit, page };
  }

  async getProductById(id) {
    const product = await productRepository.findProductsId(id);
    if (!product) {
      throw new Error('Products not found');
    }
    return product;
  }

  async createNewProduct(product, productImages) {
    const ProductExist = await productRepository.isProductExist(product.title);
    const validate = createProductValidation(product);
    if (validate.error) {
      throw new Error(validate.error.message);
    }
    // } else if (ProductExist) {
    //   throw new Error('Product is Exist');
    // }
    const { path } = await productRepository.uploadProductImg(productImages);
    const createdProduct = await productRepository.createProduct(product, path);
    return createdProduct;
  }

  async deleteProductById(id, imagePath) {
    const product = await productRepository.findProductsId(id);
    if (!product) {
      throw new Error('Product not found');
    }
    const deletedProduct = await productRepository.deleteProduct(id, imagePath);
    return deletedProduct;
  }

  async updateProductById(id, productData) {
    const product = await productRepository.findProductsId(id);
    const validate = updateProductValidation(productData);
    if (!product) {
      throw new Error('Product not found');
    } else if (validate.error) {
      throw new Error(validate.error.message);
    }
    const updatedProduct = await productRepository.updateProduct(
      id,
      productData
    );
    return updatedProduct;
  }
})();
