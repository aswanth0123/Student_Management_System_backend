import express from "express";
import {
    loginUser,
    getCurrentUser,
  } from "../controllers/auth/userAuth.controller.js";
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/getCurrentUser").post(getCurrentUser)
export default router;
