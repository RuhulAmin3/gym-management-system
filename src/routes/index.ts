import express from "express";
import { authRoutes } from "../app/modules/auth/auth.route";
import { classScheduleRoutes } from "../app/modules/class-schedule/class-schedule.route";

const router = express.Router();

const routes = [
    { path: "/auth", route: authRoutes }, 
    { path: "/class-schedule", route: classScheduleRoutes }, 
]

routes.forEach((route) => router.use(route.path, route.route));

export default router;