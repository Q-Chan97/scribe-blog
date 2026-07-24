// Query most recent blog post and render, along with user Sidebar

import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.tsx";

import Blog from "../Blog/Blog.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import ProfileCard from "../ProfileCard/ProfileCard.tsx";

export default function Main() {
    const { user } = useAuth();
    const [newestBlog, setNewestBlog] = useState(null);

    useEffect(() => {
        if (!user) return; // Wait for user

        fetch(`${import.meta.env.VITE_BACKEND_URL}/${user.id}/posts/newest`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setNewestBlog(data.post)
            })
            .catch(err => console.error(err));
    }, [user]);
    
    return (
        <section>
            {user ? (
                <main>
                    <Sidebar userId={user.id} />
                    {newestBlog ? (
                        <Blog blog={newestBlog} userId={user.id} />
                    ) : (
                        <p>No posts so far</p>
                    )}
                    <ProfileCard userId={user.id} />
                </main>
            ) : (
                <p>Welcome to the app!</p>
            )}
        </section>
    )
}