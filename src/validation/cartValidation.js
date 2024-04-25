import Joi from 'joi';

const userIdValidation = (data) => {
  const userIdSchema = Joi.string()
    .guid({ version: 'uuidv4' })
    .min(3)
    .max(100)
    .required();
  const validation = userIdSchema.validate(data);
  return validation;
};

const CartItemsValidation = (data) => {
  const productSchema = Joi.object({
    productId: Joi.string()
      .guid({ version: 'uuidv4' })
      .min(3)
      .max(100)
      .required(),
    quantity: Joi.number().min(1).max(1000).required(),
  });
  const productsArraySchema = Joi.array().items(productSchema);
  const validation = productsArraySchema.validate(data);
  return validation;
};

export { userIdValidation, CartItemsValidation };
