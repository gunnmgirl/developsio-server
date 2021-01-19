import express from "express";
import multer from "multer";

import authController from "./authController";
import {
  validateSignup,
  validateLogin,
  validateImage,
} from "../auth/authValidation";
import isValid from "../middleware/isValid";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/signup",
  upload.any("imageFile"),
  validateSignup,
  isValid,
  validateImage,
  authController.signup
);

router.post("/login", validateLogin, isValid, authController.login);

export default router;
