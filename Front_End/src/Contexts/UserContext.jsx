import { createContext ,useState , useContext } from "react";

export const UserContext =createContext();

export const useUser =()=>{
    const {user , setUser}=useContext(UserContext);
    return {user,setUser};

}

export const UserProvider =(props)=>{
    const [user, setUser] =useState(null);
    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}