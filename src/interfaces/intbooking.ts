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
    reference: string,
    checked: number,
    status: number
}

export default IntBooking;
