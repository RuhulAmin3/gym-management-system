import express from "express";
import { dataValidationRequest } from "../../middlewares/data-validate";

import { authenticate } from "../../middlewares/authenticate";
import { Role } from "@prisma/client";
import { trainerValidation } from "./trainer.validation";
import { trainerController } from "./trainer.controller";

const router = express.Router();

router.get(
  "/",
  // authenticate(Role.Admin),
  trainerController.getAllTrainer
);

router.get(
  "/:id",
  // authenticate(Role.Admin, Role.Trainer),
    trainerController.getTrainer
);

router.patch(
  "/:id",
  // authenticate(Role.Admin),
  dataValidationRequest(trainerValidation.updateTrainerZodSchema),
  trainerController.updateTrainer
);
 
router.delete(
  "/:id",
  // authenticate(Role.Admin),
  trainerController.deleteTrainer
);

export const trainerRoutes = router;
