import User from '../models/Users.js'
import { setUser} from '../service/auth.js'
export const createUser =async(req,resp)=>{
    
    const {name , email , password} = req.body;
    try
    {
        const newUser =new User({
            name:name,
            email:email,
            password:password
        })
        await newUser.save();
        resp.status(200).json({message:"User Created Successfully"})     
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}

export const signInUser =async(req,resp)=>{
    
    const {email , password} = req.body;
    try
    {
        
        const user =await User.findOne({email:email,password:password})
        if(!user)
            {
                resp.status(201).json({message:" Invalid Email or Password "})
            } 
            else
            {
               const token = setUser(user);
                resp.cookie("token",token);
                resp.status(200).json({message:"User Found"})     
            }
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
   

}

export const getUser = (requ , resp)=>{
    try
    {
        if(requ.user)
            {
                resp.status(200).json(requ.user);
            }
            else
            {
                resp.status(401).json({ message: "Please log in first." });
            }
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}
export const sugnOutUser =(requ, resp)=>{
    try
    {
        resp.clearCookie("token");
        resp.status(200).json({ message: "Logged out successfully" });     
    }
    catch(error)
    {
        resp.status(500).json({message:error.message});
    }
}