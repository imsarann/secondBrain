import express, { Router } from "express";
import { userRouter } from './user';
import { brainRouter } from "./brain";
export const rootRouter = Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/brain", brainRouter )