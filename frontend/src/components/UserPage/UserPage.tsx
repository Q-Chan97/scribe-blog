import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Blog from "../Blog/Blog.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";

export default function UserPage() {
    const { userId, id } = useParams();
    const [activeBlog, setActiveBlog] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const url = id // Hits id route if specified in params, or newest otherwise
            ? `${import.meta.env.VITE_BACKEND_URL}/${userId}/posts/${id}`
            : `${import.meta.env.VITE_BACKEND_URL}/${userId}/posts/newest`

        fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => setActiveBlog(data.post))
            .catch(err => console.error(err));
    }, [userId, id]);

    return (
        <section>
            <Sidebar userId={Number(userId)} />
            {activeBlog ? (
                <Blog blog={activeBlog} />
            ) : (
                <p>User has no posts yet.</p>
            )}
        </section>
    )
}