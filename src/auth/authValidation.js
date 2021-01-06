import { check } from "express-validator/check";

export const validateSignup = [
  check("firstName").notEmpty().withMessage("First name is required!"),
  check("lastName").notEmpty().withMessage("Last name is required!"),
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email!"),
  check("jobPosition").notEmpty().withMessage("Job position is required!"),
  check("country")
    .notEmpty()
    .withMessage("Country is required!")
    .isLength({ max: 3 }),
  check("city")
    .notEmpty()
    .withMessage("City is required!")
    .isLength({ max: 50 })
    .withMessage("Must be less that 50 characters!"),
  check("streetAddress")
    .notEmpty()
    .withMessage("Street address is required!")
    .isLength({ max: 100 })
    .withMessage("Must be less that 100 characters!"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required!")
    .isLength({ max: 15 })
    .withMessage("Must be less that 15 characters!"),
  check("previousPositions")
    .notEmpty()
    .withMessage("Previous positions is a required field"),
];
