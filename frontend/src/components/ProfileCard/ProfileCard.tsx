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
                <div>
                    <p>{profile.username}</p>
                    <p>This is Your Profile! You have {profile.followerCount} followers</p>
                </div>
            ) : (
                <div>
                    <div>
                        <p>{profile.username}</p>
                        <p>Followers: {profile.followerCount}</p>
                    </div>
                {isLoggedIn && (
                    <button onClick={() => handleFollowProfile()}>
                        {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                )}
                </div>
            )}
        </article>
    )
}