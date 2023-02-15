import { Types } from "mongoose";

interface IntContact {
    _id?: Types.ObjectId,
    date: Date,
    customer?: string,
    email: string,
    phone?: string,
    header: string,
    comment: string
}

export default IntContact;
