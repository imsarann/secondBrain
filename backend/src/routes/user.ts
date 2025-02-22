import express, { Request, Response, Router } from "express";
export const userRouter = Router();
import z from "zod";
import { Content, User } from "../db";
import bcrypt from "bcrypt"
import { JWT_SECRET, salt } from "../config";
import jwt from "jsonwebtoken";
import Middleware from "../Middleware";
const UserBodySchema = z.object({
    username : z.string().min(3).max(100),
    password : z.string().min(8).max(100),
})
type UserBody = z.infer<typeof UserBodySchema >


const contentBodySchema = z.object({
    type  : z.enum(["document", "tweet", "youtube", "link"]),
    link : z.string(),
    title : z.string(),
    tags : z.array(z.string()),

})

type ContentBody = z.infer<typeof contentBodySchema>

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
userRouter.post("/signin", async (req:Request,res: Response) : Promise<any> => {
    const body : UserBody  = req.body;
    const { success } =  UserBodySchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message : "Enter valid credentials"
        })
    } 
    const user = await User.findOne({
        username : body.username
    })
    if(!user){
        return res.json({
            message : "User dose not exist"
        })
    }
    try{
        const isPassCorrect = bcrypt.compare(body.password, user.password)
        if(!isPassCorrect){
                return res.status(403).json({
                    message : 'Passwords do not match! Authentication failed.'
                })
            }
            const token = jwt.sign({ id : user._id }, JWT_SECRET);
            return res.status(200).json({
                message : "User logged in successfully",
                token
            })
    }catch(err){
        console.error('Error during authentication:', err);
        return res.status(500).json({
            message: 'Internal server error while authenticating.',
        })
    }
})

userRouter.post("/content",Middleware, async (req:Request, res: Response) : Promise<any> => {
    const content : ContentBody = req.body;
    console.log("hellooooo content ", content)
    const { success } = contentBodySchema.safeParse(content);
    console.log("hellpaoskfgn")
    if(!success){
        return res.json({
            message : "enter valid content details"
        })
    }
    const response = await Content.create({
        type : content.type,
        link : content.link,
        title : content.title,
        tags : content.title,
        //@ts-ignore
        userId : req.userId
    })
    console.log(response)
    return res.json({
        message : 'content stored successfully'
    })
})

userRouter.get("/content",Middleware, async (req:Request, res: Response) : Promise<any> => {
    const contents = await Content.find({
        //@ts-ignore
        userId : req.userId
    }).populate("UserId", "username")
    return res.status(200).json({contents})
}) 

userRouter.delete("/content",Middleware, async (req:Request, res:Response) : Promise<any> => {
    const contentId = req.body.contentId;
    const doesOwn = await Content.findOne({
        _id : contentId 
    })
    //@ts-ignore
    if( doesOwn.userId !== req.userId){
        return res.status(403).json({
            message : `Trying to delete a doc you don’t own`
        })
    } 
    const content = await Content.deleteOne({
        contentId,
        //@ts-ignore
        userId : req.userId 
    }) 
    return res.status(200).json({
        message : `content removed successfully`
    })
})


