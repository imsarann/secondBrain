import express, { Request, Response, Router } from "express";
export const userRouter = Router();
import z from "zod";
import { User } from "../db";
import bcrypt from "bcrypt"
import { JWT_SECRET, salt } from "../config";
import jwt from "jsonwebtoken";
const UserBodySchema = z.object({
    username : z.string().min(3).max(100),
    password : z.string().min(8).max(100),
})
type UserBody = z.infer<typeof UserBodySchema >


async function hashPassword(normalPassword : string): Promise<string> {
    return bcrypt.hash(normalPassword, salt)
}

userRouter.post("/signup", 
    async (req: Request<{ id: string }>, res: Response): Promise<any> => {       
        const body : UserBody = req.body;
        const { success } = UserBodySchema.safeParse(body);
        if(!success){
            return res.status(411).json({
                message : "Error in Inputs"
            })
        }
        const isUserExist = await User.findOne({
            username : body.username
        })
        if(isUserExist){
            return res.status(403).json({message : "User already exists with this email"})
        }
        const hashedPassword = await hashPassword(body.password);
        const user = await User.create({
            username : body.username,
            password : hashedPassword,
        })
        console.log("🚀 ~ user:", user)
        // @ts-ignore
        req.userId = user._id;
        // @ts-ignore
        const token = jwt.sign({ id : req.userId }, JWT_SECRET)
         
        return res.status(200).json({
            message : "User created Successfully",
            token
        })

}) 






