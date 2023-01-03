import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    photo: String,
    position: String,
    email: { type: String, required: true },
    phone: String,
    date: Date,
    description: String,
    status: Number,
    pass: { type: String, required: true },
});

export const User = mongoose.model("user", userSchema);
