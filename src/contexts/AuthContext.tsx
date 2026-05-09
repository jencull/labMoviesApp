import React, { useState } from "react";

type AuthContextInterface = {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    signIn: (token: string, username: string) => void;
    signOut: () => void;
}

const initialContextState: AuthContextInterface = {
    token: null,
    username: null,
    isAuthenticated: false,
    signIn: () => {},
    signOut: () => {},
};

export const AuthContext = React.createContext<AuthContextInterface>(initialContextState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [username, setUsername] = useState<string | null>(
        localStorage.getItem("username")
    );

    const signIn = (newToken: string, newUsername: string) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("username", newUsername);
        setToken(newToken);
        setUsername(newUsername);
    };

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                username,
                isAuthenticated: !!token,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
