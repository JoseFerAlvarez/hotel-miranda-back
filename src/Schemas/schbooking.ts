import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true },
    room_id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    order: { type: Date, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    type: String,
    numroom: { type: Number, required: true },
    price: Number,
    request: String,
    amenities: Array,
    photos: Array,
    description: String,
    status: Number
});

export const Booking = mongoose.model("booking", bookingSchema);
