import express from "express";

import applicantsController from "./applicantsController";

const router = express.Router();

router.get("/all/:page", applicantsController.getAllApplicants);

export default router;
