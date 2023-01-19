import React, { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isUserNew, setIsUserNew] = useState(false)

    const value = {
        isUserNew,
        setIsUserNew
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }