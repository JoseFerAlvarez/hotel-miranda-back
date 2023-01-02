import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    photo: String,
    position: String,
    email: String,
    phone: String,
    date: Date,
    description: String,
    status: Number,
    pass: String,
});

export const User = mongoose.model("user", userSchema);
