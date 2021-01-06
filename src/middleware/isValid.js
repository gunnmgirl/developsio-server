import { validationResult } from "express-validator/check";

const isValid = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.data = errors.array();
      error.message = error.data[0].msg;
      throw error;
    }
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default isValid;
