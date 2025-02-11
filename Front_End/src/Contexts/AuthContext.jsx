import {useContext, createContext ,useState} from "react";

export const AuthContext = createContext();

export const useAuth =()=>{
    const {isAuthenticated,setIsAuthenticated}=useContext(AuthContext);
    return {isAuthenticated,setIsAuthenticated};
}

export const AuthProvider =(props)=>{
    const [isAuthenticated,setIsAuthenticated]=useState(null);
    return(
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    )

}