import jwt from "jsonwebtoken";

const verify = (req,res,next)=>{
    // if no token is put
    const token = req.header("auth-token");//takes token from auth-token header
    if(!token) return res.status(401).json({msg: "Access Denied"});

    try {
        const verified = jwt.verify(token,process.env.SECRETE);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).send("Invalid token")
    }

} 
export default verify;