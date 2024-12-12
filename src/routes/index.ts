import express from "express";
import { authRoutes } from "../app/modules/auth/auth.route";
import { classScheduleRoutes } from "../app/modules/class-schedule/class-schedule.route";
import { trainerRoutes } from "../app/modules/trainer/trainer.route";
import { traineeRoutes } from "../app/modules/trainee/trainee.route";

const router = express.Router();

const routes = [
  { path: "/auth", route: authRoutes },
  { path: "/class-schedule", route: classScheduleRoutes },
  { path: "/trainer", route: trainerRoutes },
  { path: "/trainee", route: traineeRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
