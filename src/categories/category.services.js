import {
  isCategoryExist,
  createCategory,
  deleteCategory,
  updateCategory,
  findCategory,
  findCategoryByUnique,
} from './category.repository.js';
import {
  createCategoryValidation,
  updateCategoryValidation,
} from '../validation/categoryValidation.js';

const getAllCategory = async () => {
  const category = await findCategory();
  if (!category) {
    return 'Category not found';
  }
  return category;
};

const getCategoryByUnique = async (slug) => {
  const category = await findCategoryByUnique(slug);
  if (!category) {
    return 'Category not found';
  }
  return category;
};

const createNewCategory = async (data) => {
  const categoryExist = await isCategoryExist(data.slug);
  const validate = createCategoryValidation(data);

  if (validate.error) {
    return validate.error.message;
  } else if (categoryExist) {
    return 'Category Is Exist!';
  }
  const category = await createCategory(data);
  return category;
};

const updateCategoryByUnique = async (slug, data) => {
  const category = await getCategoryByUnique(slug);
  const validate = updateCategoryValidation(data);
  if (!category) {
    return 'Category not found';
  } else if (validate.error) {
    return validate.error.message;
  }
  const updatedCategory = await updateCategory(slug, data);
  return updatedCategory;
};

const deleteCategoryByUnique = async (slug) => {
  const category = await getCategoryByUnique(slug);
  if (!category) {
    return 'Category not found';
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
