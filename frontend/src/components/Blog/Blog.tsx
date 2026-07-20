import Comment from "../Comment/Comment.tsx"

import { useEffect, useState } from "react";
import { useParams } from "react-router"

interface BlogProps {
    blog?: any;
}

export default function Blog({blog: blogProp}: BlogProps) {
    const { userId, id } = useParams();
    const [blog, setBlog] = useState(blogProp || null);

    useEffect(() => {
        if (blogProp || !userId || !id) return; // Skip the fetch if data is passed in as props
        fetch(`${import.meta.env.VITE_BACKEND_URL}/${userId}/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => setBlog(data.post));
    }, [userId, id]);

    return (
        <section>
            <div>
                { blog?.title }
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog?.text || "" }} />
            {blog?.replies && 
                blog.blogComments.map((comment) => (
                    <Comment text={comment.commentText} posted={comment.createdAt} replies={comment.childComments}/>
                ))}
        </section>
    )
}