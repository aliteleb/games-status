// AuthContext.js
import {createContext, useContext, useEffect, useState} from 'react';
import ApiClient from "./ApiClient.jsx";

export const AppContext = createContext(undefined, undefined);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from your authentication provider
        const fetchUser = async () => {
            try {
                const userData = await ApiClient('/user');

                if (userData.data.status === "success")
                    setUser(userData.data.data);
                else
                    setUser(null);

            } catch (error) {
                setUser(null);
            }
        };

        // Call the function to fetch user data
        fetchUser();

    }, []);

    return (
        <AppContext.Provider value={{user}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AppContext);
};
