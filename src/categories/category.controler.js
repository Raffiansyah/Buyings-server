import {
  createNewCategory,
  deleteCategoryByUnique,
  getAllCategory,
  getCategoryByUnique,
  updateCategoryByUnique,
} from './category.services.js';

const getAllCategories = async (req, res, next) => {
  try {
    const result = await getAllCategory();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getCategoriesByUnique = async (req, res, next) => {
  try {
    const result = await getCategoryByUnique(req.params.slug);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createCategories = async (req, res, next) => {
  const data = req.body;
  try {
    if(!(data.slug && data.title && data.decsription)){
      throw new ResponseError('Some Fields are missing');
    }
    const result = await createNewCategory(data);
    res.send({
      message: 'Category created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategories = async (req, res, next) => {
  const data = req.body;
  try {
    if(!(data.slug && data.title && data.decsription)){
      throw new ResponseError('Some Fields are missing');
    }
    const result = await updateCategoryByUnique(req.params.slug, data);
    res.send({
      message: 'Category updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategories = async (req, res, next) => {
  try {
    const result = await deleteCategoryByUnique(req.params.slug);
    res.send({
      message: 'Category deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategories,
  getCategoriesByUnique,
  createCategories,
  updateCategories,
  deleteCategories,
};
