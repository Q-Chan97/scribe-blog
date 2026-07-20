import { useState, useEffect } from "react"
import { Link } from "react-router";
import { useAuth } from "../../AuthContext.tsx";

interface Post {
    id: number
    title: string
    isPublished: boolean
    userId: number
    createdAt: string
}

interface SidebarProps {
    userId: number
}

export default function Sidebar({ userId }: SidebarProps) {
    const { user } = useAuth();
    const [postList, setPostList] = useState<Post[]>([]); // Array for all posts
    const isOwner = user?.id === userId;

    useEffect(() => {
        if (!userId) return;

        fetch(`${import.meta.env.VITE_BACKEND_URL}/${userId}/posts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => setPostList(data.posts))

    },[userId])
    return (
        <section>
            <h3>Blog Posts</h3>
            <ul>
                {postList.map((post) => (
                    <li key={post.id}>
                        <Link to={`/${userId}/posts/${post.id}`}>
                            {post.title}
                        </Link>
                        <p>{post.createdAt}</p>
                        {isOwner && (
                            <button>
                                {post.isPublished ? "Unpublish" : "Publish"}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}