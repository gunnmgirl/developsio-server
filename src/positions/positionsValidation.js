import { body } from "express-validator/check";

export const validateAddPosition = [
  body("name").notEmpty().withMessage("Name is required!"),
];
