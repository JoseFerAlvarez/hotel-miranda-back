import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
    numroom: Number,
    photos: Array,
    type: String,
    amenities: Array,
    price: Number,
    offer: Number,
    status: Number,
    cancellation: String
});

export const Room = mongoose.model("room", roomSchema);
