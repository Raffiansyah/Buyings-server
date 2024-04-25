import Joi from 'joi';

const createProductValidation = (data) => {
  const createProductSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    slug: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(500).optional(),
    prices: Joi.number().min(1000).max(100000000).required(),
    stock: Joi.number().min(1).max(100000).required(),
    images: Joi.string().required(),
    categorySlug: Joi.string().required(),
  });
  const validation = createProductSchema.validate(data)
  return validation
};

const updateProductValidation = (data) => {
    const updateProductSchema = Joi.object({
      title: Joi.string().min(3).max(50).optional(),
      slug: Joi.string().min(3).max(50).optional(),
      description: Joi.string().max(500).optional(),
      prices: Joi.number().min(1000).max(100000000).optional(),
      stock: Joi.number().min(1).max(100000).required(),
      images: Joi.string().optional(),
      categorySlug: Joi.string().optional(),
    });
    const validation = updateProductSchema.validate(data)
    return validation
  };

export { createProductValidation, updateProductValidation };
