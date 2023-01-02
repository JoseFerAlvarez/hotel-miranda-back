"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    _id: mongoose_1.default.Types.ObjectId,
    name: String,
    photo: String,
    position: String,
    email: String,
    phone: String,
    date: Date,
    description: String,
    status: Number,
    pass: String,
});
exports.User = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=schuser.js.map