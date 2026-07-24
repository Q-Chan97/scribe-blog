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

export const deleteBlogPost = async (postId: number) => {
    return await prisma.blogPost.delete({
        where: {
            id: postId,
        }
    })
}

export const newestBlogPost = async (userId: number) => {
    const post = await prisma.blogPost.findFirst({
        where: { userId},
        orderBy: { createdAt: "desc" },
        include: { blogComments: true},
    })
    return post;
}

export const getBlogPost = async (postId: number) => {
    const post = await prisma.blogPost.findUnique({
        where: { id: postId },
        include: { blogComments: true }
    });
    return post;
}

export const getUserPosts = async (userId: number, isOwner: boolean) => {
    const posts = await prisma.blogPost.findMany({
        where: { 
            userId,
            ...(!isOwner && { isPublished: true}) // Filter by published if not the owner
        },
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, isPublished: true, userId: true, createdAt: true }
    })
    return posts;
}

export const togglePublished = async (postId: number, isPublished: boolean) => {
    return prisma.blogPost.update({
        where: { id: postId },
        data: {
            isPublished: !isPublished,
        }
    });
}

// Comments
export const postBlogComment = async (postId: number, commentText: string, userId: number) => {
    const comment = await prisma.comment.create({
        data: {
            commentText: commentText,
            userId: userId,
            blogPostId: postId
        }
    })
    return comment;
}

export const getBlogComments = async (postId: number) => {
    return await prisma.comment.findMany({
        where: {
            blogPostId: postId
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true, 
            createdAt: true, 
            commentText: true, 
            user: {
                select: {
                    username: true
                }
            },
            childComments: {
                select: {
                    id: true,
                    commentText: true,
                    createdAt: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })
}

// Profile Card
export const profileInfo = async (userId: number, requesterId?: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            _count: {
                select: { following: true }
            },
            ...(requesterId && {
                following: {
                    where: {
                        followerId: requesterId
                    }
                }
            })
        }
    })

    if (!user) return null;

    return {
        ...user,
        isFollowed: requesterId ? (user?.following.length > 0) : false,
        followerCount: user?._count.following ?? 0,
    }
}

export const followUserQuery = async (followerId: number, followingId: number, isFollowed: boolean) => {
    if (isFollowed) {
        return prisma.follow.delete({
            where: {
                followingId_followerId: { followingId, followerId}
            }
        });
    } else {
        return prisma.follow.create({
            data: { followerId, followingId }
        });
    }
}

export const communityInfo = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            follower: {
                select: {
                    following: {
                        select: {
                            id: true, username: true
                        }
                    }
                }
            },
            following: {
                select: {
                    follower: {
                        select: {
                            id: true, username: true
                        }
                    }
                }
            }
        }
    });

    // follower relation = Follow records where this user is followerId (i.e. user is follower of...)
    // following relation = Follow records where this user is followingID (i.e. user is following...)
    return {
        following: user?.follower.map(f => f.following) ?? [],
        followers: user?.following.map(f => f.follower) ?? [],
    }
}

// Search Bar

export const searchUser = async (query: string, excludeId?: number) => {
    return prisma.user.findMany({
        where: {
            username: {
                contains: query,
                mode: "insensitive",
            },
            ...(excludeId && { // User's id is excluded if not logged in
                NOT: {
                    id: excludeId,
                }
            })
        },
        select: {
            id: true,
            username: true,
        },
        take: 7, // Limit results to 7
    })
}