import NavBar from "./NavBar"
import axios from "axios"
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useAuth } from "../Contexts/AuthContext"
import { useNavigate } from "react-router-dom"
export default function LogInPage() {
  const {isAuthenticated,setIsAuthenticated}=useAuth();
  const navigate =useNavigate();
  const [logInData,setLogInData]=useState({email:"",password:""})
  const check=()=>{
    if(isAuthenticated===true)
    {
      navigate('/')
    }
  }
  useEffect(()=>{
    check();
  },[isAuthenticated])
  const logIn=async()=>{
    try
    {
      const resp =await axios.post("http://localhost:3000/user/signin",logInData,{withCredentials:true})
      if(resp.status===201)
      {
        alert("Invalid User")
      }
      else if(resp.status===200)
      {
        setIsAuthenticated(true)
        navigate('/')
      }
    }
    catch(error)
    {
        console.error("Error While log in",error.message);
    }
  }

  return (
    <div className="logInPage">
      <div>
        <NavBar nameDropbox={false}/>
      </div>
      <div className="logInBox">
        <h1>Log In</h1>
        <div className="email">
          <label >Email:</label>
          <input type="email" required value={logInData.email} onChange={(e)=>setLogInData({...logInData,email:e.target.value})} />
        </div>
        <div className="password">
          <label >Password:</label>
          <input type="password" required value={logInData.password} onChange={(e)=>setLogInData({...logInData,password:e.target.value})}/>
        </div>
        <div className="logInButton">
          <button onClick={logIn}>Log In</button>
        </div>
        <div style={{marginTop:"3vh"}}>
          <Link style={{textDecoration:"underline", color:"blue"}} to={"/signup"}>Sign Up?</Link>
        </div>
      </div>
    </div>
  )
}
