// AuthContext.js
import {createContext, useContext, useEffect, useState} from 'react';
import ApiClient from "../../services/ApiClient.js";

export const AppContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const updateUser = newUser => {
        setUser(newUser);
        localStorage.setItem('userData', JSON.stringify(newUser))
    };

    let logoutFn = () => {
        setUser(null)
        localStorage.removeItem('userData')
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

        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        } else {
          setUser(null);
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
