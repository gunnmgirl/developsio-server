import { body } from "express-validator/check";

export const validateSignup = [
  body("firstName").notEmpty().withMessage("First name is required!"),
  body("lastName").notEmpty().withMessage("Last name is required!"),
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email!"),
  body("jobPosition").notEmpty().withMessage("Job position is required!"),
  body("country")
    .notEmpty()
    .withMessage("Country is required!")
    .isLength({ max: 3 }),
  body("city")
    .notEmpty()
    .withMessage("City is required!")
    .isLength({ max: 50 })
    .withMessage("Must be less that 50 characters!"),
  body("streetAddress")
    .notEmpty()
    .withMessage("Street address is required!")
    .isLength({ max: 100 })
    .withMessage("Must be less that 100 characters!"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required!")
    .isLength({ max: 15 })
    .withMessage("Must be less that 15 characters!"),
  body("previousPositions")
    .notEmpty()
    .withMessage("Previous positions is a required field"),
];
