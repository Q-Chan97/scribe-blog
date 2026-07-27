import styles from "./Comment.module.css";

import { useState } from "react";
import { useAuth } from "../../AuthContext.tsx";
import { type CommentType } from "../../types.ts";

export default function Comment({ id, username, commentText, createdAt, childComments, commentUserId, isDeleted, postId, userId, onReplyPosted, setBlogComments }: CommentType) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const { isLoggedIn, user } = useAuth();
    const isOwner = user?.id === commentUserId;

    async function handleReply() {
        if (!replyText) return;

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${userId}/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ commentText: replyText, parentId: id })
        })

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            onReplyPosted(id, data.comment);
            setReplyText("");
            setIsReplying(false);
        }
    }

    async function handleDelete(commentId: number) {
        if (!commentId) return; 

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${userId}/posts/${postId}/comments/${id}/delete`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })

        if (res.ok) {
            setBlogComments(prev => prev.map((comment) => (
                comment.id === commentId
                ? {...comment, isDeleted: true}
                : comment
            )));
        }
    }

    return (
        <div className={styles.commentChain}>
            <div className={styles.commentContainer}>
                <p className={styles.name}>{isDeleted ? "[Deleted]" : username}</p>
                <p className={styles.date}>{new Date(createdAt).toLocaleDateString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })}</p>
                <p>{isDeleted ? "[Comment Deleted]" : commentText}</p>
                {isLoggedIn && (
                isReplying ? (
                    <div className={styles.replyContainer}>
                        <textarea
                            className={styles.textarea}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                        />
                        <div className={styles.buttonContainer}>
                            <button className={styles.close} onClick={() => setIsReplying(false)}>Close</button>
                            <button className={styles.reply} onClick={handleReply}>Send</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <button className={styles.reply} onClick={() => setIsReplying(true)}>Reply</button>
                        {isOwner && (
                            !isDeleted && (
                                <button className={styles.delete} onClick={() => handleDelete(id)}>Delete Comment</button>
                            )
                        )}
                    </>
                )
            )}
            {childComments && 
                childComments.map((comment: any) => (
                    <Comment 
                        key={comment.id} 
                        id={comment.id}
                        username={comment.user?.username ?? comment.username}
                        commentText={comment.commentText}
                        createdAt={new Date(comment.createdAt).toLocaleDateString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            year: "2-digit",
                            month: "numeric",
                            day: "numeric",
                        })}
                        childComments={comment.childComments ?? []}
                        commentUserId={comment.userId}
                        isDeleted={comment.isDeleted}
                        postId={postId}
                        userId={userId}
                        onReplyPosted={onReplyPosted}
                        setBlogComments={setBlogComments}
                    />
                ))
            }
            </div>
        </div>
    )
}