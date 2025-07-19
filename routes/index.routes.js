import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";
import staffPermissionRoutes from "./staffPermission.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/staff-permissions", staffPermissionRoutes);





export default router;
