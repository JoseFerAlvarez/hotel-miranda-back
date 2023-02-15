import mongoose from "mongoose";
import IntContact from "../interfaces/intcontact";

const { Schema } = mongoose;

const contactSchema = new Schema<IntContact>({
    date: { type: Date, required: true },
    customer: String,
    email: { type: String, required: true },
    phone: String,
    header: { type: String, required: true },
    comment: { type: String, required: true },
});

export const Contact = mongoose.model("contact", contactSchema);
