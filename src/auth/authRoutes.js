import express from "express";
import multer from "multer";

import authController from "./authController";
import { validateSignup } from "../auth/authValidation";
import isValid from "../middleware/isValid";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/signup",
  validateSignup,
  isValid,
  upload.any("imageFile"),
  authController.signup
);

export default router;
