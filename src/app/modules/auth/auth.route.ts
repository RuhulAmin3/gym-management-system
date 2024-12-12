import express from "express";
import { dataValidationRequest } from "../../middlewares/data-validate";
import { AuthValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import { authenticate } from "../../middlewares/authenticate";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/login",
  dataValidationRequest(AuthValidation.loginZodSchema),
  authController.loginUser
);

router.post(
  "/register",
  dataValidationRequest(AuthValidation.registerTraineeZodSchema),
  authController.registerTrainee
);

router.post(
  "/trainer",
  // authenticate(Role.Admin),
  dataValidationRequest(AuthValidation.addTrainerZodSchema),
  authController.addTrainer
);

export const authRoutes = router;
