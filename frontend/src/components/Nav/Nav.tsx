import { Link, useNavigate } from "react-router";
import styles from "./Nav.module.css";

import SearchBar from "../SearchBar/SearchBar.tsx";
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
            navigate("/login");
        }
    }

    return (
        <header className={styles.navContainer}>
            <div className={styles.welcomeContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.logoContainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#2c2416"><path d="m499-287 335-335-52-52-335 335 52 52Zm-261 87q-100-5-149-42T40-349q0-65 53.5-105.5T242-503q39-3 58.5-12.5T320-542q0-26-29.5-39T193-600l7-80q103 8 151.5 41.5T400-542q0 53-38.5 83T248-423q-64 5-96 23.5T120-349q0 35 28 50.5t94 18.5l-4 80Zm280 7L353-358l382-382q20-20 47.5-20t47.5 20l70 70q20 20 20 47.5T900-575L518-193Zm-159 33q-17 4-30-9t-9-30l33-159 165 165-159 33Z"/></svg>
                    </div>
                    <h1 className={styles.title}>
                        <Link to={"/"}>Scribe</Link>
                    </h1>
                </div>
                {isLoggedIn &&
                    <h2 className={styles.welcomeMessage}>Welcome, {user?.username}</h2>
                }
            </div>
            <SearchBar />
            <nav>
                {isLoggedIn
                ? 
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to={"create"}>New Blog</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to={"community"}>Community</Link>
                        </li>
                        <li><button className={styles.logoutBtn} onClick={handleLogOut}>Logout</button></li>
                    </ul>
                : 
                    <ul className={styles.navList}>
                        <li className={styles.signUpBtn}>
                            <Link to={"signUp"}>Sign Up</Link>
                        </li>
                        <li className={styles.loginBtn}>
                            <Link to={"login"}>Login</Link>
                        </li>
                    </ul>
                }
            </nav>
        </header>
    )
}