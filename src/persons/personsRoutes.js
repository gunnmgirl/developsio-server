import express from "express";
import multer from "multer";

import isAuth from "../middleware/isAuth";
import isValid from "../middleware/isValid";
import { validateEditPerson, validateGetPerson } from "./personsValidation";
import { validateImage } from "../auth/authValidation";
import personsController from "./personsController";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get(
  "/:id",
  isAuth,
  validateGetPerson,
  isValid,
  personsController.getPerson
);
router.post(
  "/:id",
  upload.any("imageFile"),
  isAuth,
  validateEditPerson,
  isValid,
  validateImage,
  personsController.editPerson
);

export default router;
