import { useContext } from "react";

import { AuthContext, AuthContextDataProps } from "../components/AuthContext";

export function useAuth(): AuthContextDataProps {
    const context = useContext(AuthContext);

    return context;
}