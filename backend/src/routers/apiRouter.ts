import { Router } from "express";
import { verifyToken } from "../controllers/authController.js";
import * as api from "../controllers/apiController.js"

const apiRouter = Router();

apiRouter.post("/:userId/posts/create", verifyToken, api.createPost);

apiRouter.get("/:userId/posts/newest", verifyToken, api.getNewestPost);

export default apiRouter;