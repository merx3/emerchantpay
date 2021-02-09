import React, { useState, useContext, createContext } from "react";

const authContext = createContext(undefined);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (email, password) => {
        setTimeout(() => {}, 1000);
        setUser("user");
        return true;
    };

    const signup = (email, password) => {
        // Not required for this task
        return true;
    };

    const signout = () => {
        setTimeout(() => {}, 1000);
        setUser(null);
        return true;
    };


    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout
    };
}