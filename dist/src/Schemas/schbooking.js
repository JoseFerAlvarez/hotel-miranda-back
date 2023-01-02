"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const bookingSchema = new Schema({
    name: String,
    order: Date,
    checkin: Date,
    checkout: Date,
    type: Number,
    numroom: Number,
    price: Number,
    request: String,
    amenities: Array,
    photos: Array,
    description: String,
    status: Number
});
exports.Booking = mongoose_1.default.model("booking", bookingSchema);
//# sourceMappingURL=schbooking.js.map