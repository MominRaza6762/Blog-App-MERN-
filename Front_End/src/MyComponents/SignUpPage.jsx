import NavBar from "./NavBar"
import axios from "axios"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function SignUpPage() {
  const navigate =useNavigate();
  const [signUpData,setSignUpData]=useState({name:"",email:"",password:""})
  const signUp=async()=>{
    try
    {
      const resp =await axios.post("http://localhost:3000/user/signup",signUpData,{withCredentials:true})
      if(resp.status===200)
      {
        alert("User Created Successfuly")
        navigate("/login");
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
        <h1>Sign Up</h1>
        <div className="email">
          <label >Name:</label>
          <input type="text" required value={signUpData.name} onChange={(e)=>setSignUpData({...signUpData,name:e.target.value})} />
        </div>
        <div className="email">
          <label >Email:</label>
          <input type="email" required value={signUpData.email} onChange={(e)=>setSignUpData({...signUpData,email:e.target.value})} />
        </div>
        <div className="password">
          <label >Password:</label>
          <input type="password" required value={signUpData.password} onChange={(e)=>setSignUpData({...signUpData,password:e.target.value})}/>
        </div>
        <div className="logInButton">
          <button onClick={signUp}>Sign Up</button>
        </div>
        <div style={{marginTop:"3vh"}}>
          <Link style={{textDecoration:"underline", color:"blue"}} to={"/login"}>Log In</Link>
        </div>
      </div>
    </div>
  )
}
