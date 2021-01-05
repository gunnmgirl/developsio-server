import express from "express";
import multer from "multer";

import authController from "./authController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/signup", upload.any("imageFile"), authController.signup);

export default router;
