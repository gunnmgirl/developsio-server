import express from "express";
import isAuth from "../middleware/isAuth";

import positionsController from "./positionsController";

const router = express.Router();

router.get("/", positionsController.getAllPositions);

export default router;
