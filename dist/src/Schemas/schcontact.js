"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const contactSchema = new Schema({
    date: Date,
    customer: String,
    email: String,
    phone: String,
    header: String,
    comment: String
});
exports.Contact = mongoose_1.default.model("contact", contactSchema);
//# sourceMappingURL=schcontact.js.map