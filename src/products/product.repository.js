import { prisma } from '../application/databases.js';
import { logger } from '../application/logger.js';
import { supabaseAdmin } from '../lib/supabases.js';

export default new (class ProductRepository {
  //function to check is product exist
  async isProductExist(title) {
    try {
      const products = await prisma.product.findFirst({
        where: {
          title,
        },
      });
      return {
        message: 'Product is Exist, try to add something else',
        products,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //function to findProduct by order
  async findProducts(searchQuery, pageQuery, cateQuerry, filterQuery) {
    const page = parseInt(pageQuery) || 0;
    const limit = 10;
    const offset = limit * page;
    const totalRows = await prisma.product.count({
      where: {
        title: {
          contains: searchQuery,
        },
        categorySlug: {
          contains: cateQuerry,
        },
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    let orderBy = {};
    if (filterQuery == 'price_asc') {
      orderBy.prices = 'asc';
    } else if (filterQuery == 'price_desc') {
      orderBy.prices = 'desc';
    } else if (filterQuery == 'product_desc') {
      orderBy.createdAt = 'desc';
    }

    const products = await prisma.product.findMany({
      take: limit,
      where: {
        title: {
          contains: searchQuery,
        },
        categorySlug: {
          contains: cateQuerry,
        },
      },
      skip: offset,
      orderBy,
    });
    return { products, totalPage, totalRows, limit, page };
  }
  //function to find product detail by id
  async findProductsId(id) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }
  //function to create product
  async createProduct(product, path) {
    try {
      const data = await prisma.product.create({
        data: {
          title: product.title,
          slug: product.slug.toLowerCase(),
          stock: parseInt(product.stock),
          prices: parseInt(product.prices),
          categorySlug: product.categorySlug,
          description: product.description,
          images: path,
        },
      });
      logger.info(`ProductRepository: success to create products`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  //function to upload product image
  async uploadProductImg(productImages) {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from('ProductImages')
        .upload(`products/${Date.now()}`, productImages, {
          contentType: 'image/png',
        });
      if (error) {
        logger.error(
          `ProductRepository: Error to upload image product because : ${error.message}`
        );
        throw new Error(error.message);
      }
      logger.info(`ProductRepository: Upload file successfully`);
      return data;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // function to delete selected product
  async deleteProduct(id, imagePath) {
    const { error } = await supabaseAdmin.storage
      .from('ProductImages')
      .remove(imagePath);
    if (error) {
      throw new Error(error.message);
    }
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    return deletedProduct;
  }
  //function to update product
  async updateProduct(id, productData) {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: productData,
    });
    return product;
  }
})();
