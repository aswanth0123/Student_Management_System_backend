import express from "express";
import {
    loginUser,
    getCurrentUser,
    logoutUser,
  } from "../controllers/auth/userAuth.controller.js";
import { authCheckMiddleware } from "../middleware/authCheckMiddleware.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/me").get(authCheckMiddleware, getCurrentUser);
router.route("/logout").post(authCheckMiddleware, logoutUser);

export default router;
