import express, { Request, Response, Router } from "express";
import { Content, Link, User } from "../db";
import Middleware from "../Middleware";
import { random } from "../utils";
export const brainRouter = Router();

brainRouter.post(
  "/share",
  Middleware,
  async (req: Request, res: Response): Promise<any> => {
    const share = req.body.share;
    if (share) {
      const existingShare = await Link.findOne({
        //@ts-ignore
        userId: req.userId,
      });
      if (!existingShare) {
        const hash = random(10);
        await Link.create({
          //@ts-ignore
          userId: req.userId,
          hash,
        });
        return res.json({
          hash,
        });
      } else {
        return res.json({
          hash: existingShare.hash,
        });
      }
    } else {
      await Link.deleteOne({
        //@ts-ignore
        userId: req.userId,
      });
    }
  }
);


brainRouter.get("/:shareLink",Middleware, async (req:Request, res: Response) : Promise<any> => {
    const hash = req.params.shareLink;
    const link = await Link.findOne({
        hash
    })
    if(!link){
        return res.status(411).json({
            message : `Incorrect Inputs`
        })
    }
    const content = await Content.findOne({
        //@ts-ignore
        userId : link.UserId
    })
    const user = await User.findOne({
        _id : link.userId
    })
    if(!user){
        return res.json({
            message : `User does not exist , Major Error` , 
        })
    }
    return res.status(200).json({
        username : user.username,
        content 
    })
})

