import { check, body } from "express-validator/check";

import Person from "./personsModel";

const passwordHasher = require("../utils/passwordHasher");

export const validateGetPerson = [
  check("id").notEmpty().withMessage("personId is required!"),
];

export const validateEditPerson = [
  check("id").notEmpty().withMessage("personId name is required!"),
  body("firstName").notEmpty().withMessage("First name is required!"),
  body("lastName").notEmpty().withMessage("Last name is required!"),
];

export const validateChangePassword = [
  check("id").notEmpty().withMessage("personId name is required!"),
  body("currentPassword").custom(async (value, { req }) => {
    const person = await Person.findByPk(req.params.id);
    const isEqual = await passwordHasher.verify(person.password, value);
    if (!isEqual) {
      return Promise.reject("You entered a wrong password!");
    }
  }),
  body("newPassword")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Must be at least 5 characters long"),
];
