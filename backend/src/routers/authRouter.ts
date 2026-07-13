import { Router } from "express";
import { createUser } from "../controllers/authController.js";
import { validateUser, validateSignup } from "../utils/validation.js";

const authRouter = Router();

authRouter.get("/auth", (_req, res) => {
    res.json("This is the authorization router.")
})

authRouter.post("/auth/sign-up", validateUser, validateSignup, createUser)

export default authRouter;