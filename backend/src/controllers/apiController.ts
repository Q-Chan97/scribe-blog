import * as queries from "../db/queries.js"

import { type Request, type Response } from "express"

export const createPost = async (req: Request, res: Response) => {

    try {
        const { title, content } = req.body;
        const post = await queries.createBlogPost(title, content, req.user!.id);
        res.status(201).json({ post });
    } catch (err) {
        console.error(err);
    }
}

export const getNewestPost = async(req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const id = Number(userId);

        if (!id) return;

        const post = await queries.newestBlogPost(id);

        res.status(201).json({post});
    } catch (err) {
        console.error(err);
    }
}

export const getUserPosts = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const isOwner = req.user!.id === userId
        const posts = await queries.getUserPosts(userId, isOwner);
        res.status(201).json({ posts });
    } catch (err) {
        console.error(err);
    }
}

export const togglePublished = async (req: Request, res: Response) => {
    try {
        const postId = Number(req.params.postId);
        const { isPublished } = req.body;
        const post = await queries.togglePublished(postId, isPublished);
        res.status(201).json({ post })
    } catch (err) {
        console.error(err);
    }
}