"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    photo: String,
    position: String,
    email: { type: String, required: true },
    phone: String,
    date: Date,
    description: String,
    status: { type: Number, required: true },
    pass: { type: String, required: true },
});
exports.User = mongoose_1.default.model("user", userSchema);
