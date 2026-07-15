import { Router } from "express";
import { createUser, loginUser, verifyToken, logoutUser } from "../controllers/authController.js";
import { validateUser, validateSignup } from "../utils/validation.js";

const authRouter = Router();

authRouter.post("/auth/sign-up", validateUser, validateSignup, createUser);

authRouter.post("/auth/login", loginUser);

authRouter.post("/auth/logout", verifyToken, logoutUser);

export default authRouter;