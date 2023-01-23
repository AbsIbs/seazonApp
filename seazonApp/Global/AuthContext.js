import React, { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isUserNew, setIsUserNew] = useState(false)

    return (
        <AuthContext.Provider value={{ isUserNew, setIsUserNew }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }