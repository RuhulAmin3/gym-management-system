import express from "express";
import { dataValidationRequest } from "../../middlewares/data-validate";
import { AuthValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = express.Router();

router.post(
  "/login",
  dataValidationRequest(AuthValidation.loginZodSchema),
  authController.loginUser
);

router.post(
  "/register",
  dataValidationRequest(AuthValidation.registerTraineeZodSchema),
  authController.RegisterTrainee
);

export const authRoutes = router;
