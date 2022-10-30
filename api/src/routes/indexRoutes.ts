import { Router } from "express";
import userRoutes from "./userRoutes"
import taskRoutes from "./taskRoutes"
import authRoutes from "./authRoutes"

const routes = Router();

routes.use("/api/users", userRoutes);
routes.use("/api/task", taskRoutes);
routes.use("/api/auth", authRoutes)

export default routes;