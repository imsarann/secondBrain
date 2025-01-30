"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const user_1 = require("./user");
const brain_1 = require("./brain");
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.use("/users", user_1.userRouter);
exports.rootRouter.use("/brain", brain_1.brainRouter);
