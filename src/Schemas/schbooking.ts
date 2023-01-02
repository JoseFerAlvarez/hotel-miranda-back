import mongoose from "mongoose";
const { Schema } = mongoose;

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

export const Booking = mongoose.model("booking", bookingSchema);
