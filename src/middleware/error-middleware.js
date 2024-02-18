import { ResponseError } from '../error/response-error.js';

export const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
  } else {
    if (err instanceof ResponseError) {
      res.status(err.status).json(err);
    } else {
      res.status(500).json(err);
    }
  }
};
