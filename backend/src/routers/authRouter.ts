import { Router } from "express";
import * as auth from "../controllers/authController.js";
import { validateUser, validateSignup } from "../utils/validation.js";

const authRouter = Router();

authRouter.post("/auth/sign-up", validateUser, validateSignup, auth.createUser);

authRouter.post("/auth/login", auth.loginUser);

authRouter.post("/auth/logout", auth.verifyToken, auth.logoutUser);

export default authRouter;