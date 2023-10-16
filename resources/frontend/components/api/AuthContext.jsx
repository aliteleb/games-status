// AuthContext.js
import {createContext, useContext, useEffect, useState} from 'react';
import ApiClient from "../../services/ApiClient.js";

export const AppContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const updateUser = newUser => {
        setUser(newUser);
    };

    let logoutFn = () => {
        setUser(null)
    }

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

        if(window.authData.isAuthenticated){
            setUser(window.authData.user);
        }

    }, []);


    return (
        <AppContext.Provider value={{user, updateUser, logoutFn }}>
            {children}
        </AppContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AppContext);
};

export { AuthProvider, useAuth };
