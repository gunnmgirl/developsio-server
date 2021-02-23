import { body } from "express-validator/check";
import fs from "fs";

import Person from "../persons/personsModel";
import passwordHasher from "../utils/passwordHasher";

export const validateSignup = [
  body("firstName").notEmpty().withMessage("First name is required!"),
  body("lastName").notEmpty().withMessage("Last name is required!"),
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email!")
    .custom(async (value) => {
      const person = await Person.findOne({ where: { email: value } });
      if (person) {
        return Promise.reject(
          "You already registered with this email address!"
        );
      }
    }),
  body("positionId").notEmpty().withMessage("Job position is required!"),
  body("country").notEmpty().withMessage("Country is required!"),
  body("city")
    .notEmpty()
    .withMessage("City is required!")
    .isLength({ max: 50 })
    .withMessage("City must be less that 50 characters!"),
  body("streetAddress")
    .notEmpty()
    .withMessage("Street address is required!")
    .isLength({ max: 100 })
    .withMessage("Street address be less that 100 characters!"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required!")
    .isLength({ max: 15 })
    .withMessage("Phone number must be less that 15 characters!"),
  body("previousPositions")
    .notEmpty()
    .withMessage("Previous positions is a required field"),
];

export const validateLogin = [
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email!")
    .custom(async (value) => {
      const person = await Person.findOne({ where: { email: value } });
      if (!person) {
        return Promise.reject("Admin with that email does not exist!");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .custom(async (value, { req }) => {
      const person = await Person.findOne({ where: { email: req.body.email } });
      const isEqual = await passwordHasher.verify(person.password, value);
      if (!isEqual) {
        return Promise.reject("You entered a wrong password!");
      }
    }),
];

export const validateImage = async (req, res, next) => {
  try {
    if (req.files && req.files.length && req.files[0] && req.files[0].path) {
      if (
        req.files[0].mimetype !== "image/jpeg" &&
        req.files[0].mimetype !== "image/png"
      ) {
        const error = new Error(
          "Image type not supported, only jpeg and png files allowed!"
        );
        error.statusCode = 400;
        fs.unlink(req.files[0].path, (error) => {
          if (error) {
            throw new Error("Could not delete a file", error);
          }
          console.log("Successfully deleted");
        });
        throw error;
      }
    }
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
