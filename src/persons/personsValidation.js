import { check, body } from "express-validator/check";

export const validateGetPerson = [
  check("id").notEmpty().withMessage("personId is required!"),
];

export const validateEditPerson = [
  check("id").notEmpty().withMessage("personId name is required!"),
  body("firstName").notEmpty().withMessage("First name is required!"),
  body("lastName").notEmpty().withMessage("Last name is required!"),
];
