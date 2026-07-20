import { Router } from "express";
import { verifyToken } from "../controllers/authController.js";
import * as api from "../controllers/apiController.js"

const apiRouter = Router();

// Create Post
apiRouter.post("/:userId/posts/create", verifyToken, api.createPost);

// Get Newest Post
apiRouter.get("/:userId/posts/newest", verifyToken, api.getNewestPost);

// Toggle Published
apiRouter.patch("/:userId/posts/:postId/publish", verifyToken, api.togglePublished);

// Get Single Post
apiRouter.get("/:userId/posts/:postId", verifyToken, api.getSinglePost);

// Get All Posts
apiRouter.get("/:userId/posts", verifyToken, api.getUserPosts);

export default apiRouter;