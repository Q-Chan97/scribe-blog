import "../../App.css";
import "../../vars.css";

import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../AuthContext.tsx";
import { jwtDecode } from "jwt-decode";

interface User {
    id: number
    username: string
}

export default function SignUp() {
    const {setIsLoggedIn} = useAuth();
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget;

        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: (form.elements.namedItem("username") as HTMLInputElement).value,
                email: (form.elements.namedItem("email") as HTMLInputElement).value,
                password: (form.elements.namedItem("password") as HTMLInputElement).value,
                confirmPassword: (form.elements.namedItem("confirmPassword") as HTMLInputElement).value,
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
    }

    return (
        <main>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username"></input>
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email"></input>
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" id="password"></input>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="text" name="confirmPassword" id="confirmPassword"></input>
                </div>

                {error && <p>{error}</p>}

                <div>
                    <Link to={"/"}>
                        Return
                    </Link>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </main>
    )
}