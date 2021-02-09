import express from "express";
import isAuth from "../middleware/isAuth";

import applicantsController from "./applicantsController";

const router = express.Router();

router.get("/all/:page", isAuth, applicantsController.getAllApplicants);
router.delete("/", isAuth, applicantsController.deleteApplicant);

export default router;
