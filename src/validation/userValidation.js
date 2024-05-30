import Joi from 'joi';

const createAdminValidation = (data) => {
  const createAdminSchema = Joi.object({
    email: Joi.string().min(10).max(25).required(),
    password: Joi.string().min(8).max(100).required(),
    user_metadata: Joi.object({
      first_name: Joi.string().min(3).max(50).required(),
      last_name: Joi.string().min(3).max(50).required(),
      avatar_url: Joi.string().optional(),
    }),
  });
  const validation = createAdminSchema.validate(data);
  return validation;
};

const createUserValidation = (dataUser) => {
  const createUserSchema = Joi.object({
    email: Joi.string().min(10).max(25).required(),
    password: Joi.string().min(8).max(100).required(),
    option: Joi.object({
      data: Joi.object({
        first_name: Joi.string().min(3).max(50).required(),
        last_name: Joi.string().min(3).max(50).required(),
        avatar_url: Joi.string().optional(),
      }),
    }),
  });
  const validation = createUserSchema.validate(dataUser);
  return validation;
};

export { createAdminValidation, createUserValidation };
