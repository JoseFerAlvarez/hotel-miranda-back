import { connect } from "../db/connection";
import { Booking, User, Room } from "../Schemas/schemas";
import { IntRoom, IntUser, IntBooking } from "../interfaces/interfaces";
import { Types } from "mongoose";

const bookingsList = async (req, res, next) => {
    connect(null);

    const query = Booking.find();

    await query.exec((err: Error, bookings: IntBooking[]) => {
        if (err) return next(err);
        res.json(bookings);
    });
}

const bookingsDetail = async (req, res, next) => {
    connect(null);

    const query = Booking.findOne({ "_id": req.params.idbooking });

    await query.exec((err: Error, booking: IntBooking) => {
        if (err) return next(err);
        res.json(booking)
    });
}

const bookingsPost = async (req, res) => {
    connect(null);

    const booking: IntBooking = req.body.booking;
    const userid: typeof Types.ObjectId = booking.user_id;
    const roomid: typeof Types.ObjectId = booking.room_id;

    if (await userExists(userid) && await roomExists(roomid)) {
        await Booking.create(booking);

        res.json({
            message: "New booking posted",
            newbooking: booking
        });
    } else {
        res.json({
            message: "Invalid data"
        });
    }
}

const bookingsPut = async (req, res, next) => {
    connect(null);

    const booking: IntBooking = req.body.booking;
    const userid: typeof Types.ObjectId = booking.user_id;
    const roomid: typeof Types.ObjectId = booking.room_id;

    if (await userExists(userid) && await roomExists(roomid)) {
        const query = Booking.findOneAndUpdate({ "_id": req.params.idbooking }, req.body.booking);

        await query.exec((err: Error, room: IntRoom) => {
            if (err) return next(err);

            res.json({
                message: "Booking put",
                oldbooking: room,
                newbooking: req.body.booking
            });
        });
    } else {
        res.json({
            message: "Invalid data"
        });
    }
}

const bookingsDelete = async (req, res, next) => {
    const query = Booking.findOneAndDelete({ "_id": req.params.idbooking });

    await query.exec((err: Error, booking: IntBooking) => {
        if (err) return next(err);

        res.json({
            message: "Room deleted",
            oldbooking: booking
        });
    })
}

/* Function helpers to check the user and room ids */
async function userExists(userid: typeof Types.ObjectId): Promise<boolean> {
    const userQuery = User.findOne({ "_id": userid });

    return await userQuery.exec()
        .then((result: IntUser) => result ? true : false);
}

async function roomExists(roomid: typeof Types.ObjectId): Promise<boolean> {
    const roomQuery = Room.findOne({ "_id": roomid });

    return await roomQuery.exec()
        .then((result: IntRoom) => result ? true : false);
}


export {
    bookingsList,
    bookingsDetail,
    bookingsPost,
    bookingsPut,
    bookingsDelete
}
