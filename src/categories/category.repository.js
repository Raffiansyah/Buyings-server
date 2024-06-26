import { prisma } from '../application/databases.js';

const isCategoryExist = async (slug) => {
  const category = await prisma.category.findFirst({
    where: {
      slug,
    },
  });
  return category;
};

const findCategory = async () => {
  const category = await prisma.category.findMany({
    include: {
      Product: true,
    },
  });
  return category;
};

const findCategoryByUnique = async (slug) => {
  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      Product: true,
    },
  });
  return category;
};

const createCategory = async (data) => {
  const category = await prisma.category.create({
    data,
  });
  return category;
};

const updateCategory = async (slug, data) => {
  const category = await prisma.category.update({
    where: {
      slug,
    },
    data,
  });
  return category;
};

const deleteCategory = async (slug) => {
  const category = await prisma.category.delete({
    where: {
      slug,
    },
  });

  return category;
};

export {
  isCategoryExist,
  findCategory,
  findCategoryByUnique,
  createCategory,
  updateCategory,
  deleteCategory,
};
