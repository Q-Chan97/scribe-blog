import styles from "./ProfileCard.module.css";

import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext.tsx";

interface ProfileCardProps {
    userId: number
}

interface Profile {
    id: number
    username: string
    isFollowed: boolean
    followerCount: number
}

export default function ProfileCard({ userId }: ProfileCardProps) {
    const { isLoggedIn, user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const isOwner = user?.id === userId;

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data ?? null)
                setIsFollowed(data.isFollowed);
            })
    }, [userId])

    async function handleFollowProfile() {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/follow`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ isFollowed })
        })

        if (res.ok) {
            const newIsFollowed = !isFollowed;
            setIsFollowed(newIsFollowed)
            setProfile(prev => prev ? {
                ...prev,
                followerCount: isFollowed ? prev.followerCount - 1 : prev.followerCount + 1
            } : null);
        }
    }

    if (!profile) return null;

    return (
        <article>
            {isOwner ? (
                <div className={styles.container}>
                    <div className={styles.username}>
                        <p className={styles.name}>{profile.username}</p>
                        <p className={styles.id}>ID: #{profile.id}</p>
                    </div>
                    <p className={styles.followers}>This is Your Profile! You have {profile.followerCount} followers</p>
                </div>
            ) : (
                <div className={styles.container}>
                    <div>
                        <div className={styles.username}>
                            <p className={styles.name}>{profile.username}</p>
                            <p className={styles.id}>ID: #{profile.id}</p>
                        </div>
                        <p className={styles.followers}>Followers: {profile.followerCount}</p>
                    </div>
                {isLoggedIn && (
                    <button onClick={() => handleFollowProfile()} className={isFollowed ? styles.unfollow : styles.follow}>
                        {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                )}
                </div>
            )}
        </article>
    )
}