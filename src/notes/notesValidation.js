import { body } from "express-validator/check";

export const validateAddNote = [
  body("title").notEmpty().withMessage("Title is required!"),
];
