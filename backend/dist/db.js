"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Content = exports.Tag = exports.Link = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
try {
    mongoose_1.default.connect(config_1.connectionString);
}
catch (err) {
    console.log("Error in connecting MongoDB", err);
}
const userScheme = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 8,
        trim: true,
    }
});
const linkSchema = new mongoose_1.default.Schema({
    hash: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const contentTypes = ["image", "video", "article", "audio"];
const contentSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        enum: contentTypes,
    },
    tags: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag"
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});
const tagsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});
exports.Link = mongoose_1.default.model("Link", linkSchema);
exports.Tag = mongoose_1.default.model("Tag", tagsSchema);
exports.Content = mongoose_1.default.model("Content", contentSchema);
exports.User = mongoose_1.default.model("User", userScheme);
