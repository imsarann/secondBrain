"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (len) => {
    let words = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let length = words.length;
    let randomWord = "";
    for (let i = 0; i <= len; i++) {
        randomWord += words[Math.floor(Math.random() * length)];
    }
    return randomWord;
};
exports.random = random;
