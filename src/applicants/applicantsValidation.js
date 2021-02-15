import { body } from "express-validator/check";

export const validateUpdateApplicantStatus = [
  body("statusId").notEmpty().withMessage("statusId is required!"),
  body("personId").notEmpty().withMessage("personId is required!"),
];
