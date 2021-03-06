import express from "express";
import isAuth from "../middleware/isAuth";

import notesController from "./notesController";
import { validateAddNote, validateDeleteNote } from "./notesValidation";
import isValid from "../middleware/isValid";

const router = express.Router();

router.get("/", isAuth, notesController.getNotes);
router.delete(
  "/:id",
  isAuth,
  validateDeleteNote,
  isValid,
  notesController.deleteNote
);
router.post("/", isAuth, validateAddNote, isValid, notesController.addNote);
router.post(
  "/edit",
  isAuth,
  validateAddNote,
  isValid,
  notesController.editNote
);

export default router;
