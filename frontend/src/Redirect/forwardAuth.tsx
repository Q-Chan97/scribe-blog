import { Navigate } from "react-router";
import { useAuth } from "../AuthContext.tsx";
import type { ReactNode } from "react";

export default function ForwardAuthenticated({ children }: { children: ReactNode }) {
    const { isLoggedIn } = useAuth();

    if ( isLoggedIn ) return <Navigate to={"/"} />
    return <>{children}</>;
}