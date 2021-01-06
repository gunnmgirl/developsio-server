import { validationResult } from "express-validator/check";
import fs from "fs";

const isValid = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.data = errors.array();
      error.message = error.data[0].msg;
      if (req.files && req.files[0] && req.files[0].path) {
        fs.unlink(req.files[0].path, (error) => {
          if (error) {
            throw new Error("Could not delete a file", error);
          }
          console.log("Successfully deleted");
        });
      }
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
