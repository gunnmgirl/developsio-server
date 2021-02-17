import express from "express";
import multer from "multer";

import isAuth from "../middleware/isAuth";
import applicantsController from "./applicantsController";
import {
  validateUpdateApplicantStatus,
  validateDeleteApplicant,
  validateUploadApplicantImage,
} from "./applicantsValidation";
import { validateImage } from "../auth/authValidation";
import isValid from "../middleware/isValid";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/all/:page", isAuth, applicantsController.getAllApplicants);
router.get("/:id", isAuth, applicantsController.getApplicant);
router.delete(
  "/:id",
  isAuth,
  validateDeleteApplicant,
  isValid,
  applicantsController.deleteApplicant
);
router.post("/", isAuth, applicantsController.restoreApplicant);
router.post(
  "/status",
  isAuth,
  validateUpdateApplicantStatus,
  isValid,
  applicantsController.changeApplicantStatus
);
router.patch(
  "/:id",
  upload.any("imageFile"),
  isAuth,
  validateUploadApplicantImage,
  isValid,
  validateImage,
  applicantsController.uploadApplicantImage
);

export default router;
