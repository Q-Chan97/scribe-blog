import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext.tsx";

import Comment from "../Comment/Comment.tsx"

interface BlogProps {
    blog?: any
    userId: number
}

interface Comment {
    id: number
    user: { username: string }
    commentText: string
    createdAt: Date
    childComments: Comment[]
}

export default function Blog({ blog, userId }: BlogProps) {
    const { isLoggedIn } = useAuth();
    const [blogComments, setBlogComments] = useState([]);
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

    if (!blog) return null;

    return (
        <section>
            <div>
                { blog?.title }
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog?.text || "" }} />
            {isLoggedIn && 
                <div>
                    <form>
                        <label htmlFor="comment">Post a Comment: </label>
                        <textarea name="comment" id="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                        <div>
                            <button type="button" onClick={() => setCommentText("")}>Clear</button>
                            <button type="submit" onClick={() => handlePostComment()}>Post Comment</button>
                        </div>
                    </form>
                </div>
            }
            {blogComments.length > 0 && 
                blogComments.map((comment: Comment) => (
                    <Comment key={comment.id} 
                    id={comment.id}
                    username={comment.user.username} 
                    text={comment.commentText} 
                    posted={comment.createdAt} 
                    replies={comment.childComments}/>
                ))
            }
        </section>
    )
}