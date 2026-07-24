import styles from "./Sidebar.module.css";

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
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null)
    const isOwner = user?.id === userId;

    useEffect(() => {
        if (!userId) return;

        fetch(`${import.meta.env.VITE_BACKEND_URL}/${userId}/posts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => setPostList(data.posts ?? []))

    },[userId])

    async function handleTogglePublished(post: Post) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${user.id}/posts/${post.id}/publish`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ isPublished: post.isPublished })
        });

        if (res.ok) {
            setPostList(prev => prev.map(p => 
                p.id === post.id ? { ...p, isPublished: !p.isPublished } : p
            ))
        }
    }

    async function handleDeleteBlogPost(post: Post) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${user.id}/posts/${post.id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (res.ok) {
            setPostList(prev => prev.filter(p => 
                p.id !== post.id
            ))
            setConfirmDelete(null);
        }
    }

    return (
        <section>
            <div className={styles.container}>
                <h3 className={styles.title}>Blog Posts</h3>
                <div>
                    <ul className={styles.list}>
                        {postList.map((post) => (
                            <>
                                <li key={post.id} className={styles.postList}>
                                    <div className={styles.postInfo}>
                                        <Link to={`/${userId}/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                        <p>{new Date(post.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "numeric",
                                        })}
                                        </p>
                                    </div>
                                    {isOwner && (
                                    <div className={styles.buttonContainer}>
                                        <button onClick={() => handleTogglePublished(post)} className={post.isPublished ? styles.unpublish : styles.publish}>
                                            {post.isPublished ? "Unpublish" : "Publish"}
                                        </button>
                                        {confirmDelete === post.id ? (
                                            <div>
                                                <span>Do you want to delete this?</span>
                                                <div className={styles.buttonContainer}>
                                                    <button onClick={() => setConfirmDelete(null)} className={styles.unpublish}>No</button>
                                                    <button onClick={() => handleDeleteBlogPost(post)} className={styles.deleteBtn}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button onClick={() => setConfirmDelete(post.id)} className={styles.deleteBtn}>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}