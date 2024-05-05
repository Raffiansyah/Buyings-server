import { prisma } from '../application/databases.js';
import { supabaseAdmin } from '../lib/supabases.js';

const isProductExist = async (slug) => {
  const products = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
  return products;
};

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

const createProduct = async (product, productImages) => {
  const { data, error } = await supabaseAdmin.storage
    .from('ProductImages')
    .upload(`products/${Date.now()}`, productImages, {
      contentType: 'image/png',
    });
  if (error) {
    return error.message;
  }
  const createdProduct = await prisma.product.create({
    data: {
      title: product.title,
      slug: product.slug,
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
  const { data, error } = await supabaseAdmin.storage
    .from('ProductImages')
    .remove(imagePath);
  if(error){
    return error
  }
  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });
  return deletedProduct, data;
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
