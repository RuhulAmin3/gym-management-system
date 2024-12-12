import express from "express";
import { dataValidationRequest } from "../../middlewares/data-validate";
import { classSchduleController } from "./class-schedule.controller";
import { ClassScheduleValidation } from "./class-schedule.validation";
import { authenticate } from "../../middlewares/authenticate";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  // authenticate(Role.Admin),
  dataValidationRequest(ClassScheduleValidation.createClassScheduleZodSchema),
  classSchduleController.createClassSchedule
);

router.get(
  "/",
  // authenticate(Role.Admin),
  classSchduleController.getAllClassSchedule
);

router.get(
  "/:id",
  // authenticate(Role.Admin),
  classSchduleController.getClassSchedule
);

router.put(
  "/:id",
  // authenticate(Role.Admin),
  dataValidationRequest(ClassScheduleValidation.createClassScheduleZodSchema),
  classSchduleController.updateClassSchedule
);

router.patch(
  "/:id",
  // authenticate(Role.Admin),
  dataValidationRequest(
    ClassScheduleValidation.assignTrainerClassScheduleZodSchema
  ),
  classSchduleController.assignTrainerIntoClassSchedule
);

router.delete(
  "/:id",
  // authenticate(Role.Admin),
  classSchduleController.deleteClassSchedule
);

export const classScheduleRoutes = router;
