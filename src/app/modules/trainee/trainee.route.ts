import express from "express";
import { dataValidationRequest } from "../../middlewares/data-validate";

import { authenticate } from "../../middlewares/authenticate";
import { Role } from "@prisma/client";
import { traineeController } from "./trainee.controller";
import { traineeValidation } from "./trainee.validation";

const router = express.Router();

router.get(
  "/",
  authenticate(Role.Admin),
  traineeController.getAllTrainee
);

router.post(
  "/booking",
  authenticate(Role.Trainee),
  dataValidationRequest(traineeValidation.addBookingZodSchema),
  traineeController.addBooking
);

router.get(
  "/:id",
  authenticate(Role.Admin, Role.Trainee),
  traineeController.getTrainee
);

router.patch(
  "/:id",
  authenticate(Role.Trainee),
  dataValidationRequest(traineeValidation.updateTraineeZodSchema),
  traineeController.updateTrainee
);

router.delete(
  "/:id",
  authenticate(Role.Admin),
  traineeController.deleteTrainee
);

export const traineeRoutes = router;
