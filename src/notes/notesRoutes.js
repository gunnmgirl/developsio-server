import express from "express";

import notesController from "./notesController";

const router = express.Router();

router.get("/", notesController.getNotes);

export default router;
