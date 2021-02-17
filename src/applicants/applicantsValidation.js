import { body, check } from "express-validator/check";

export const validateUpdateApplicantStatus = [
  body("statusId").notEmpty().withMessage("statusId is required!"),
  body("personId").notEmpty().withMessage("personId is required!"),
];

export const validateDeleteApplicant = [
  check("id").notEmpty().withMessage("personId is required!"),
];

export const validateUploadApplicantImage = [
  check("id").notEmpty().withMessage("personId is required!"),
];
