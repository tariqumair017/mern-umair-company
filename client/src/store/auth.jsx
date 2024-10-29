import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authToken = `Bearer ${token}`;

    const API = import.meta.env.VITE_API_BASE_URL; 

    //store tokrn in local
    const storeTokenInLocal = (serviceToken) => {
        setToken(serviceToken);
        return localStorage.setItem("token", serviceToken);
    }

    let isLoggedIn = !!token;

    //logout handle
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    //check auth token and get current user data
    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/loggedin-user`, {
                method: "GET",
                headers: {
                    authorization: authToken
                }
            });
 
            if(response.ok){
                const user_data = await response.json(); 
                console.log("user_data", user_data) 
                setUser(user_data.user); 
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error", error)
        } 
    };
    
    //get services data to show on services page
    const getServicesData = async () => {
        try {
            const response = await fetch(`${API}/api/service/get-all`, {
                method: "GET"
            }); 
            if(response.ok){
                const services_data = await response.json(); 
                console.log("services data ", services_data) 
                setServices(services_data.services); 
            }
        } catch (error) {
            console.log("error", error)
        } 
    };
    
    useEffect(() => {
        getServicesData();
        userAuthentication();
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLocal, LogoutUser, user, services, authToken, isLoading, API }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}

