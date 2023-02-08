import mongoose from "mongoose";
import { Types } from "mongoose";
import IntBooking from "../interfaces/intbooking";

const { Schema } = mongoose;

const bookingSchema = new Schema<IntBooking>({
    user_id: { type: Types.ObjectId, required: true },
    room_id: { type: Types.ObjectId, required: true },
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
    reference: { type: String, required: true },
    checked: { type: Number, required: true },
    status: { type: Number, required: true },
});

export const Booking = mongoose.model("booking", bookingSchema);
