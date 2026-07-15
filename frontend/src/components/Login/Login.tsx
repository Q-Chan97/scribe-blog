import "../../App.css";
import "../../vars.css";

import { useState, type SubmitEvent} from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../AuthContext.tsx";
import { jwtDecode } from "jwt-decode";

interface User {
    id: number
    username: string
}

export default function Login() {
    const { setIsLoggedIn, setUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: (form.elements.namedItem("username") as HTMLInputElement).value,
                password: (form.elements.namedItem("password") as HTMLInputElement).value,
            })
        })

        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem("token", token);
            const decoded = jwtDecode<{ user: User }>(token)
            setIsLoggedIn(true); // Logs in after signing up
            setUser(decoded.user);
            navigate("/")
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username"></input>
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" id="password"></input>
                </div>

                {error && <p>{error}</p>}

                <div>
                    <Link to={"/"}>
                        <button type="button">Home</button>
                    </Link>
                    <button type="submit">Login</button>
                </div>
            </form>
        </main>
    )
}