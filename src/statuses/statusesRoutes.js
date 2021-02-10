import express from "express";
import isAuth from "../middleware/isAuth";

import statusesController from "./statusesController";

const router = express.Router();

router.get("/", isAuth, statusesController.getStatuses);

export default router;
