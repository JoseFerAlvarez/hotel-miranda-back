import { Types } from "mongoose"

interface IntBooking {
    _id?: typeof Types.ObjectId,
    user_id: typeof Types.ObjectId,
    room_id: typeof Types.ObjectId,
    name: string,
    order: Date,
    checkin: Date,
    checkout: Date,
    type: string,
    numroom: number,
    price: number,
    request?: string,
    amenities?: string[],
    photos?: string[],
    description?: string,
    status: number
}

export default IntBooking;
