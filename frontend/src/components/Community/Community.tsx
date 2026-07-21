import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Follow {
    id: number
    username: string
}

export default function Community() {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/users/community`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setFollowers(data.followers)
            setFollowing(data.following)
        })
    }, [])

    function handleClick (user: Follow) {
        navigate(`/${user.id}/posts/newest`)
    }

    return (
        <section>
            <div>
                <h4>Users You Follow:</h4>
                {following.length > 0 ? (
                    <>
                    <ul>
                        {following.map((followedUser: Follow) => (
                            <li key={followedUser.id} onClick={() => handleClick(followedUser)}>
                                {followedUser.username}
                            </li>
                        ))}
                    </ul>
                    </>
                ) : (
                    <p>You're not following anyone currently.</p>
                )}
            </div>
            <div>
                <h4>Following You:</h4>
                {followers.length > 0 ? (
                    <ul>
                        {followers.map((follower: Follow) => (
                            <li key={follower.id} onClick={() => handleClick(follower)}>
                                {follower.username}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users following you currently.</p>
                )}
            </div>
        </section>
    )
}