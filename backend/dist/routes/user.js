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
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
const zod_1 = __importDefault(require("zod"));
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Middleware_1 = __importDefault(require("../Middleware"));
const UserBodySchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(100),
    password: zod_1.default.string().min(8).max(100),
});
const contentBodySchema = zod_1.default.object({
    type: zod_1.default.enum(["document", "tweet", "youtube", "link"]),
    link: zod_1.default.string(),
    title: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string()),
});
function hashPassword(normalPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.hash(normalPassword, config_1.salt);
    });
}
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = UserBodySchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "Error in Inputs"
        });
    }
    const isUserExist = yield db_1.User.findOne({
        username: body.username
    });
    if (isUserExist) {
        return res.status(403).json({ message: "User already exists with this email" });
    }
    const hashedPassword = yield hashPassword(body.password);
    const user = yield db_1.User.create({
        username: body.username,
        password: hashedPassword,
    });
    console.log("🚀 ~ user:", user);
    // @ts-ignore
    req.userId = user._id;
    // @ts-ignore
    const token = jsonwebtoken_1.default.sign({ id: req.userId }, config_1.JWT_SECRET);
    return res.status(200).json({
        message: "User created Successfully",
        token
    });
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = UserBodySchema.safeParse(body);
    if (!success) {
        return res.status(411).json({
            message: "Enter valid credentials"
        });
    }
    const user = yield db_1.User.findOne({
        username: body.username
    });
    if (!user) {
        return res.json({
            message: "User dose not exist"
        });
    }
    try {
        const isPassCorrect = bcrypt_1.default.compare(body.password, user.password);
        if (!isPassCorrect) {
            return res.status(403).json({
                message: 'Passwords do not match! Authentication failed.'
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET);
        return res.status(200).json({
            message: "User logged in successfully",
            token
        });
    }
    catch (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({
            message: 'Internal server error while authenticating.',
        });
    }
}));
exports.userRouter.post("/content", Middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    console.log("hellooooo content ", content);
    const { success } = contentBodySchema.safeParse(content);
    console.log("hellpaoskfgn");
    if (!success) {
        return res.json({
            message: "enter valid content details"
        });
    }
    const response = yield db_1.Content.create({
        type: content.type,
        link: content.link,
        title: content.title,
        tags: content.title,
        //@ts-ignore
        userId: req.userId
    });
    console.log(response);
    return res.json({
        message: 'content stored successfully'
    });
}));
exports.userRouter.get("/content", Middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contents = yield db_1.Content.find({
        //@ts-ignore
        userId: req.userId
    }).populate("UserId", "username");
    return res.status(200).json({ contents });
}));
exports.userRouter.delete("/content", Middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const doesOwn = yield db_1.Content.findOne({
        _id: contentId
    });
    //@ts-ignore
    if (doesOwn.userId !== req.userId) {
        return res.status(403).json({
            message: `Trying to delete a doc you don’t own`
        });
    }
    const content = yield db_1.Content.deleteOne({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    return res.status(200).json({
        message: `content removed successfully`
    });
}));
