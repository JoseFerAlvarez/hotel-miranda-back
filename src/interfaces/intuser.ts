import { Types } from "mongoose";

interface IntUser {
    _id?: Types.ObjectId,
    name: string,
    photo?: string,
    position?: string,
    email: string,
    phone?: string,
    date?: Date,
    description?: string,
    status: number,
    pass: string,
}

export default IntUser;
