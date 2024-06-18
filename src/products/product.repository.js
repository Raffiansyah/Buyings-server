import { prisma } from '../application/databases.js';
import { supabaseAdmin } from '../lib/supabases.js';

const isProductExist = async (title) => {
  const products = await prisma.product.findFirst({
    where: {
      title,
    },
  });
  return products;
};

const findProducts = async (searchQuery, pageQuery) => {
  const page = parseInt(pageQuery) || 0;
  const limit = 5;
  const offset = limit * page;
  const totalRows = await prisma.product.count({
    where: {
      title: {
        contains: searchQuery,
      },
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const products = await prisma.product.findMany({
    take: limit,
    where: {
      title: {
        contains: searchQuery,
      },
    },
    skip: offset,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return { products, totalPage, totalRows, limit, page };
};

const findProductsId = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const createProduct = async (product, productImages) => {
  const { data, error } = await supabaseAdmin.storage
    .from('ProductImages')
    .upload(`products/${Date.now()}`, productImages, {
      contentType: 'image/png',
    });
  if (error) {
    throw new Error(error);
  }
  const createdProduct = await prisma.product.create({
    data: {
      title: product.title,
      slug: product.slug.toLowerCase(),
      stock: parseInt(product.stock),
      prices: product.prices,
      categorySlug: product.categorySlug,
      description: product.description,
      images: data.path,
    },
  });
  return createdProduct;
};

const deleteProduct = async (id, imagePath) => {
  const { error } = await supabaseAdmin.storage
    .from('ProductImages')
    .remove(imagePath);
  if (error) {
    throw new Error(error);
  }
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
      id,
    },
    data: productData,
  });
  return product;
};

export {
  isProductExist,
  findProducts,
  findProductsId,
  createProduct,
  deleteProduct,
  updateProduct,
};
