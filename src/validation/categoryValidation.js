import Joi from 'joi';

const createCategoryValidation = (data) => {
  const createCategorySchema = Joi.object({
    slug: Joi.string().min(3).max(30).required(),
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
  });
  const validation = createCategorySchema.validate(data);
  return validation;
};

const updateCategoryValidation = (data) => {
  const updateCategorySchema = Joi.object({
    slug: Joi.string().min(3).max(30).optional(),
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).optional(),
  });
  const validation = updateCategorySchema.validate(data);
  return validation;
};

export { createCategoryValidation, updateCategoryValidation };
