import express from "express";
import isAuth from "../middleware/isAuth";

import applicantsController from "./applicantsController";
import { validateUpdateApplicantStatus } from "./applicantsValidation";
import isValid from "../middleware/isValid";

const router = express.Router();

router.get("/all/:page", isAuth, applicantsController.getAllApplicants);
router.get("/:id", isAuth, applicantsController.getApplicant);
router.delete("/", isAuth, applicantsController.deleteApplicant);
router.post("/", isAuth, applicantsController.restoreApplicant);
router.post(
  "/status",
  isAuth,
  validateUpdateApplicantStatus,
  isValid,
  applicantsController.changeApplicantStatus
);

export default router;
