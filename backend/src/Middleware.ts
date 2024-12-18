import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request{
    userId? : string, 
}


export default function Middleware(req: CustomRequest, res :Response, next : NextFunction) : void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({
          message: "Authorization header is missing",
        });
        return;
      }
      const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as{ userId : string };
        req.userId = decoded.userId
        next();
    }catch(err){
        res.status(401).json({
            message : "Wrong token"
        }) 
    }
}
