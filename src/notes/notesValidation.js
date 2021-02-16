import { body, check } from "express-validator/check";

export const validateAddNote = [
  body("title").notEmpty().withMessage("Title is required!"),
];

export const validateDeleteNote = [
  check("id").notEmpty().withMessage("noteId is required!"),
];
