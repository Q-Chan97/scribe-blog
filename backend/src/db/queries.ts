import { prisma } from "./prisma.js";

interface reqTypes {
    username: string,
    password: string,
    email: string,
}

export const createUser = async ({username, password, email}: reqTypes) => {
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
        },
        select: {
            id: true,
            username: true,
            email: true,
        }
    });
    return user;
}

export const createBlogPost = async (title: string, content: string, authorId: number) => {
    const post = await prisma.blogPost.create({
       data: {
        title: title,
        text: content,
        userId: authorId,
       }
    })
    return post;
}

export const newestBlogPost = async (userId: number) => {
    const post = await prisma.blogPost.findFirst({
        where: { userId},
        orderBy: { createdAt: "desc" },
        include: { blogComments: true},
    })
    return post;
}

export const getUserPosts = async (userId: number) => {
    const posts = await prisma.blogPost.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, isPublished: true, userId: true }
    })
    return posts;
}