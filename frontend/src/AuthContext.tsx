import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";

interface AuthContextType {
    isLoggedIn: boolean
    setIsLoggedIn: (val: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
    children: ReactNode
}

export function AuthProvider({ children }: Props ) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchUser = async () => {
          if (hasFetched.current) return;
            hasFetched.current = true;
    
            const token = localStorage.getItem("token");
            if (!token) return;
    
            try {
              const res = await fetch("/api/user", {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (res.ok) setIsLoggedIn(true);
            } catch {
              setIsLoggedIn(false);
            }
        };
        fetchUser()
    }, []) // Runs once on mount

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
            { children }
        </AuthContext.Provider>
    )
}

// Custom Hook, accessible from everywhere
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}