import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
    date: Date,
    customer: String,
    email: String,
    phone: String,
    header: String,
    comment: String
});

export const Contact = mongoose.model("contact", contactSchema);
