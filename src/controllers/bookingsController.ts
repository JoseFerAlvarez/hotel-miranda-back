import { connect, disconnect } from "../db/connection";
import { Booking, User, Room } from "../Schemas/schemas";
import { IntRoom, IntUser, IntBooking } from "../interfaces/interfaces";
import { Types } from "mongoose";

const bookingsList = async (req, res, next) => {
    await connect();

    const bookings: IntBooking[] = await Booking
        .find()
        .exec()
        .catch((e: Error) => next(e));

    res.json(bookings);

    await disconnect();
}

const bookingsDetail = async (req, res, next) => {
    await connect();

    const booking = await Booking
        .findOne({ "_id": req.params.idbooking })
        .exec()
        .catch((e: Error) => next(e));

    res.json(booking);

    await disconnect();
}

const bookingsPost = async (req, res, next) => {
    await connect();

    const booking: IntBooking = req.body.booking;
    const userid: typeof Types.ObjectId = booking.user_id;
    const roomid: typeof Types.ObjectId = booking.room_id;

    let newbooking: IntBooking = null;

    if (await userExists(userid) && await roomExists(roomid)) {
        newbooking = await Booking.create(booking)
            .then((booking) => booking)
            .catch((e: Error) => next(e));

        res.json({
            message: "New booking posted",
            newbooking: newbooking
        });
    } else {
        res.json({
            message: "Invalid data"
        });
    }

    await disconnect();
}

const bookingsPut = async (req, res, next) => {
    await connect();

    const booking: IntBooking = req.body.booking;
    const userid: typeof Types.ObjectId = booking.user_id;
    const roomid: typeof Types.ObjectId = booking.room_id;

    if (await userExists(userid) && await roomExists(roomid)) {
        const booking: IntBooking = await Booking
            .findOneAndUpdate({ "_id": req.params.idbooking }, req.body.booking)
            .exec()
            .catch((e: Error) => next(e));

        res.json({
            message: "Booking put",
            oldbooking: booking,
            newbooking: req.body.booking
        });
    } else {
        res.json({
            message: "Invalid data"
        });
    }

    await disconnect();
}

const bookingsDelete = async (req, res, next) => {
    await connect();

    const booking: IntBooking = await Booking
        .findOneAndDelete({ "_id": req.params.idbooking })
        .exec()
        .catch((e: Error) => next(e));

    res.json({
        message: "Room deleted",
        oldbooking: booking
    });

    await disconnect();
}

/* Function helpers to check the user and room ids */
async function userExists(userid: typeof Types.ObjectId): Promise<boolean> {
    return await User
        .findOne({ "_id": userid })
        .exec()
        .then((result: IntUser) => result ? true : false);
}

async function roomExists(roomid: typeof Types.ObjectId): Promise<boolean> {
    return await Room
        .findOne({ "_id": roomid })
        .exec()
        .then((result: IntRoom) => result ? true : false);
}


export {
    bookingsList,
    bookingsDetail,
    bookingsPost,
    bookingsPut,
    bookingsDelete
}
