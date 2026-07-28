import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import Blog from "../Blog/Blog.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import ProfileCard from "../ProfileCard/ProfileCard.tsx";

export default function UserPage() {
    const { userId, id } = useParams();
    const [activeBlog, setActiveBlog] = useState(null);
    const navigate = useNavigate();

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
            .then(res => {
                if (!res.ok) {
                    navigate("/404");
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (!data) return;
                if (!data.post) { // User exists but no posts
                    setActiveBlog(null);
                } else {
                    setActiveBlog(data.post);
                }
            })
            .catch(err => console.error(err));
    }, [userId, id]);

    return (
        <section style={{ display: "flex", padding: "20px", gap: "40px"}}>
            <Sidebar userId={Number(userId)} />
            {activeBlog ? (
                <Blog blog={activeBlog} userId={Number(userId)} />
            ) : (
                <p>User has no posts yet.</p>
            )}
            <ProfileCard userId={Number(userId)} />
        </section>
    )
}