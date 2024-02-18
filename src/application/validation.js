import { ResponseError } from '../error/response-error.js';

export const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    alowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  }
  return result.value;
};
