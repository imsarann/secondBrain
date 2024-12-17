import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Request, Response, NextFunction } from "express";


export default function Middleware(req: Request, res :Response, next : NextFunction) {
   // @ts-ignore
    const token = req.headers.authorization.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        // @ts-ignore
        req.userId = decoded.userId
        next();
    }catch(err){
        return res.status(401).json({
            message : "Wrong token"
        }) 
    }
}
