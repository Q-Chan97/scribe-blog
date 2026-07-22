import { Router } from "express";
import { verifyToken, optionalAuth } from "../controllers/authController.js";
import * as api from "../controllers/apiController.js"

const apiRouter = Router();

// Create Post
apiRouter.post("/:userId/posts/create", verifyToken, api.createPost);

// Delete Post
apiRouter.delete("/:userId/posts/:postId/delete", verifyToken, api.deletePost);

// Get Newest Post
apiRouter.get("/:userId/posts/newest", optionalAuth, api.getNewestPost);

// Get Single Post
apiRouter.get("/:userId/posts/:postId", optionalAuth, api.getSinglePost);

// Toggle Published
apiRouter.patch("/:userId/posts/:postId/publish", verifyToken, api.togglePublished);

// Get All Posts
apiRouter.get("/:userId/posts", optionalAuth, api.getUserPosts);

// User search
apiRouter.get("/users/search",optionalAuth, api.searchUsers);

// Community
apiRouter.get("/users/community", verifyToken, api.getCommunity);

// Follow/Un-follow User
apiRouter.patch("/users/:userId/follow", verifyToken, api.followUserLogic);

// User Profile Card
apiRouter.get("/users/:userId/profile", optionalAuth, api.getProfileInfo);

export default apiRouter;