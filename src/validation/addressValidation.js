import Joi from 'joi';

const createAddressValidation = (data) => {
  const createAddresSchema = Joi.object({
    label: Joi.string().min(3).max(100).required(),
    street: Joi.string().min(3).max(100).required(),
    city: Joi.string().min(3).max(100).required(),
    province: Joi.string().min(3).max(100).required(),
    country: Joi.string().min(3).max(50).required(),
    postalCode: Joi.string().min(3).max(20).required(),
  });
  const validation = createAddresSchema.validate(data);
  return validation;
};

export { createAddressValidation };
