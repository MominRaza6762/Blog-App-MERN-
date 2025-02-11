import jwt from "jsonwebtoken";
const secret ="676627562676267";
export const setUser=(user)=>{
    return jwt.sign({_id:user._id,name:user.name,email:user.email,role:user.role},secret)
}
export const getUser=(token)=>{
    const user = jwt.verify(token,secret);
    if(user)
        {
        return user;
    }
    else
    {
        return null;
    }
}