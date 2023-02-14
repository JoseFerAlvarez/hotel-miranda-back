"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const { Schema } = mongoose_1.default;
const bookingSchema = new Schema({
    user_id: { type: mongoose_2.Types.ObjectId, required: true },
    room_id: { type: mongoose_2.Types.ObjectId, required: true },
    name: { type: String, required: true },
    order: { type: Date, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    type: { type: String, required: true },
    numroom: { type: Number, required: true },
    price: { type: Number, required: true },
    request: String,
    amenities: Array,
    photos: Array,
    description: String,
    status: { type: Number, required: true },
});
exports.Booking = mongoose_1.default.model("booking", bookingSchema);
//# sourceMappingURL=schbooking.js.map