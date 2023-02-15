import mongoose from "mongoose";
import IntUser from "../interfaces/intuser";

const { Schema } = mongoose;

const userSchema = new Schema<IntUser>({
    name: { type: String, required: true },
    photo: String,
    position: String,
    email: { type: String, required: true },
    phone: String,
    date: Date,
    description: String,
    status: { type: Number, required: true },
    pass: { type: String, required: true },
});

export const User = mongoose.model("user", userSchema);
