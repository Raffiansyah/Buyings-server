import Joi from 'joi';

const createAddressValidation = (data) => {
  const createAddresSchema = Joi.object({
    street: Joi.string().min(3).max(100).required(),
    city: Joi.string().min(3).max(100).required(),
    province: Joi.string().min(3).max(100).required(),
    country: Joi.string().min(3).max(50).required(),
    postalCode: Joi.string().min(3).max(20).required(),
    userId: Joi.string().guid({ version: 'uuidv4' }).min(3).max(100).required(),
  });
  const validation = createAddresSchema.validate(data);
  return validation;
};

const updateAddressValidation = (data) => {
  const updateAddresSchema = Joi.object({
    street: Joi.string().min(3).max(100).required(),
    city: Joi.string().min(3).max(100).optional(),
    province: Joi.string().min(3).max(100).optional(),
    country: Joi.string().min(3).max(50).optional(),
    postalCode: Joi.string().min(3).max(20).required(),
    userId: Joi.string().guid({ version: 'uuidv4' }).min(3).max(100).optional(),
  });
  const validation = updateAddresSchema.validate(data);
  return validation;
};

export { createAddressValidation, updateAddressValidation };
