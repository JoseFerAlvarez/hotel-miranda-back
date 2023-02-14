"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const roomSchema = new Schema({
    numroom: { type: Number, required: true },
    photos: Array,
    type: String,
    amenities: Array,
    price: Number,
    offer: Number,
    status: { type: Number, required: true },
    cancellation: String
});
exports.Room = mongoose_1.default.model("room", roomSchema);
//# sourceMappingURL=schroom.js.map