import { getUser } from '../service/auth.js';

export const checkForAuthentication =  (req, resp, next) => {
    try {
        req.user=null;
        const token = req.cookies.token;

        if (!token) {
            return next();
            // resp.status(401).json({ message: "Please log in first." }); 
        }

        const user = getUser(token); 
        // if (!user) {
        //     return resp.status(401).json({ message: "Invalid user, please log in first." });
        // }

        req.user = user; 
        return next(); 
    } catch (error) {
        console.error("Error in restrictToLogin middleware:", error);
        resp.status(500).json({ message: "An error occurred. Please try again later." });
    }
};

export const ristrictTo = (roles =[])=>{
    return function (req, resp, next){
        if(!req.user)
        {
           return  resp.status(401).json({ message: "Please log in first." });
        }
        if(!roles.includes(req.user.role))
        {
            return  resp.status(401).json({ message: "UnAuthorized user." });
        }
        return next();
    }
}

