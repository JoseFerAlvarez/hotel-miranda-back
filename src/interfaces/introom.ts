import { Types } from "mongoose";

interface IntRoom {
    _id?: typeof Types.ObjectId,
    numroom: number,
    photos?: string[],
    type?: string,
    amenities?: string[],
    price?: number,
    offer?: number,
    status: number,
    cancellation?: string
}

export default IntRoom;
