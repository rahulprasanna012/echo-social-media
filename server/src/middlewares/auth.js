import jwt from "jsonwebtoken"
import {config} from "@dotenvx/dotenvx"

config()

export const auth=(req,res,next)=>{


    const token = req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]

    if (!token) return res.status(401).json({ error: "No token provided" })

    jwt.verify(token,process.env.TOKEN_SCERET,(err,payload)=>{
        if (err) return res.status(403).json({ error: "Invalid or expired token" });
        req.user = payload; 
        next();
    })

}