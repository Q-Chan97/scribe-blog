import { Link, useNavigate } from "react-router";
import styles from "./Nav.module.css";

import { useAuth } from "../../AuthContext.tsx";

export default function Nav() {
    const { isLoggedIn, setIsLoggedIn, user } = useAuth()
    const navigate = useNavigate();

    const handleLogOut = async () => {

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
            method: "POST", 
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } 
        });
        
        if (res.ok) {
            localStorage.removeItem("token");
            setIsLoggedIn(false)
            navigate("/"); // State change triggers re-render
        }
    }

    return (
        <header className={styles.navContainer}>
            <div className={styles.welcomeContainer}>
                <h1>Scribe</h1>
                {isLoggedIn &&
                    <h2>Welcome, {user?.username}</h2>
                }
            </div>
            <div>
                <input type="text" placeholder="search"></input>
            </div>
            <nav>
                {isLoggedIn
                ? 
                    <ul className={styles.navList}>
                        <button onClick={handleLogOut}>Logout</button>
                    </ul>
                : 
                    <ul className={styles.navList}>
                        <li className={styles.signUpBtn}>
                            <Link to={"SignUp"}>Sign Up</Link>
                        </li>
                        <li className={styles.loginBtn}>
                            <Link to={"Login"}>Login</Link>
                        </li>
                    </ul>
                }
            </nav>
        </header>
    )
}