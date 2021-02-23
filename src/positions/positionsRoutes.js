import express from "express";

import isAuth from "../middleware/isAuth";
import positionsController from "./positionsController";
import {
  validateAddPosition,
  validateEditPosition,
} from "./positionsValidation";
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
router.patch(
  "/:id",
  isAuth,
  validateEditPosition,
  isValid,
  positionsController.editPosition
);

export default router;
