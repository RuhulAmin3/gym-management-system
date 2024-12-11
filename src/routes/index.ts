import express from "express";
import { authRoutes } from "../app/modules/auth/auth.route";

const router = express.Router();

const routes = [
    { path: "/auth", route: authRoutes }
]

routes.forEach((route) => router.use(route.path, route.route));

export default router;