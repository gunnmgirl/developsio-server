import { body, check } from "express-validator/check";

export const validateAddPosition = [
  body("name").notEmpty().withMessage("Name is required!"),
];

export const validateEditPosition = [
  body("name").notEmpty().withMessage("Name is required!"),
  check("id").notEmpty().withMessage("positionId is required!"),
];
