import express, { Router } from "express";
import { userRouter } from './user';
export const rootRouter = Router();

rootRouter.use("/users", userRouter);