"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brainRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const Middleware_1 = __importDefault(require("../Middleware"));
const utils_1 = require("../utils");
exports.brainRouter = (0, express_1.Router)();
exports.brainRouter.post("/share", Middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingShare = yield db_1.Link.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        if (!existingShare) {
            const hash = (0, utils_1.random)(10);
            yield db_1.Link.create({
                //@ts-ignore
                userId: req.userId,
                hash,
            });
            return res.json({
                hash,
            });
        }
        else {
            return res.json({
                hash: existingShare.hash,
            });
        }
    }
    else {
        yield db_1.Link.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });
    }
}));
exports.brainRouter.get("/:shareLink", Middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.Link.findOne({
        hash
    });
    if (!link) {
        return res.status(411).json({
            message: `Incorrect Inputs`
        });
    }
    const content = yield db_1.Content.findOne({
        //@ts-ignore
        userId: link.UserId
    });
    const user = yield db_1.User.findOne({
        _id: link.userId
    });
    if (!user) {
        return res.json({
            message: `User does not exist , Major Error`,
        });
    }
    return res.status(200).json({
        username: user.username,
        content
    });
}));
