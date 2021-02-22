import express from "express";

import isAuth from "../middleware/isAuth";
import positionsController from "./positionsController";
import { validateAddPosition } from "./positionsValidation";
import isValid from "../middleware/isValid";

const router = express.Router();

router.get("/", positionsController.getAllPositions);
router.post(
  "/",
  isAuth,
  validateAddPosition,
  isValid,
  positionsController.addPosition
);

export default router;
