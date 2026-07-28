import styles from "./Blog.module.css";

import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext.tsx";
import { type RawComment } from "../../types.ts";

import Comment from "../Comment/Comment.tsx"

interface BlogProps {
    blog?: any
    userId: number
}

export default function Blog({ blog, userId }: BlogProps) {
    const { isLoggedIn } = useAuth();
    const [blogComments, setBlogComments] = useState<RawComment[]>([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        if (!userId || !blog?.id) return; 

        fetch(`${import.meta.env.VITE_BACKEND_URL}/${userId}/posts/${blog.id}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setBlogComments(data.comments);
        })
    }, [blog?.id, userId])
    
    async function handlePostComment() {
        if (!commentText || commentText === "") return; 

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${userId}/posts/${blog.id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ commentText })
        })
        
        if (res.ok) {
            const data = await res.json();
            setBlogComments(prev => [...prev, data.comment]);
            setCommentText("");
        }
    }

    async function handleReplyPosted(parentId: number, reply: any) {
        setBlogComments(prev => prev.map(comment => 
            comment.id === parentId
                ? {...comment, childComments: [...comment.childComments, reply]}
                : comment
        ))
    }

    if (!blog) return null;

    return (
        <section className={styles.container}>
            <div className={styles.blogTitle}>
                { blog?.title }
            </div>
            <div className={styles.blogText} dangerouslySetInnerHTML={{ __html: blog?.text || "" }} />
            {isLoggedIn && 
                <div>
                    <form>
                        <div className={styles.commentArea}>
                            <label htmlFor="comment">Post a Comment: </label>
                            <textarea className={styles.commentText} name="comment" id="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.clear} type="button" onClick={() => setCommentText("")}>Clear</button>
                            <button className={styles.postComment} type="submit" onClick={() => handlePostComment()}>Post Comment</button>
                        </div>
                    </form>
                </div>
            }
            {blogComments.length > 0 && 
                blogComments.map((comment: RawComment) => (
                    <Comment 
                        key={comment.id}
                        id={comment.id}
                        username={comment.user?.username}
                        userId={userId}
                        commentText={comment.commentText}
                        createdAt={new Date(comment.createdAt).toLocaleDateString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            year: "2-digit",
                            month: "numeric",
                            day: "numeric",
                        })}
                        commentUserId={comment.userId}
                        isDeleted={comment.isDeleted}
                        postId={blog.id}
                        childComments={comment.childComments ?? []}
                        onReplyPosted={handleReplyPosted}
                        setBlogComments={setBlogComments}/>
                ))
            }
        </section>
    )
}