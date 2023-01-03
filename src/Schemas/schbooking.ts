import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
    user_id: mongoose.Types.ObjectId,
    room_id: mongoose.Types.ObjectId,
    name: String,
    order: Date,
    checkin: Date,
    checkout: Date,
    type: String,
    numroom: Number,
    price: Number,
    request: String,
    amenities: Array,
    photos: Array,
    description: String,
    status: Number
});

export const Booking = mongoose.model("booking", bookingSchema);
