import {
  createCategory,
  deleteCategory,
  updateCategory,
  findCategory,
  findCategoryByUnique,
} from './category.repository.js';
import {ResponseError} from '../error/response-error.js';

const getAllCategory = async () => {
  const category = await findCategory();
  if(!category){
    throw new ResponseError('Category not found');
  }
  return category;
};

const getCategoryByUnique = async (slug) => {
  const category = await findCategoryByUnique(slug);
  if(!category){
    throw new ResponseError('Category not found');
  }
  return category;
};

const createNewCategory = async (data) => {
  const category = await createCategory(data);
  return category;
};

const updateCategoryByUnique = async (slug, data) => {
  const category = await getCategoryByUnique(slug);
  if (!category) {
    throw new ResponseError('Category not found');
  }
  const updatedCategory = await updateCategory(slug, data);
  return updatedCategory;
};

const deleteCategoryByUnique = async (slug) => {
  const category = await getCategoryByUnique(slug);
  if (!category) {
    throw new ResponseError('Category not found');
  }
  const deletedCategory = await deleteCategory(slug);
  return deletedCategory;
};

export {
  createNewCategory,
  deleteCategoryByUnique,
  getAllCategory,
  getCategoryByUnique,
  updateCategoryByUnique,
};
