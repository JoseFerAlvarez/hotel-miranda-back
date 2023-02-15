import mongoose from "mongoose";
import IntRoom from "../interfaces/introom";

const { Schema } = mongoose;

const roomSchema = new Schema<IntRoom>({
    numroom: { type: Number, required: true },
    photos: Array,
    type: String,
    amenities: Array,
    price: Number,
    offer: Number,
    status: { type: Number, required: true },
    cancellation: String
});

export const Room = mongoose.model("room", roomSchema);
