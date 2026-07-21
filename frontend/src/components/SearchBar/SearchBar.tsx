import { useState } from "react"
import { useNavigate } from "react-router"

interface User {
    id: number
    username: string
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<User[]>([]) // Array of user results
    const navigate = useNavigate();

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setQuery(searchValue);

        // Clear results when empty
        if (!searchValue.trim()) {
            setResults([]);
            return;
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/search?q=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (res.ok) {
            const data = await res.json();
            setResults(data.users ?? []);
        }
    }

    // Clear results and redirect to user's page
    const handleSelect = (selectedUser: User) => {
        setQuery("");
        setResults([]);
        navigate(`/${selectedUser.id}/posts/newest`)
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={handleSearch} 
            />
            {results.length > 0 && (
                <ul>
                    {results.map((user) => (
                        <li key={user.id} onClick={() => handleSelect(user)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}