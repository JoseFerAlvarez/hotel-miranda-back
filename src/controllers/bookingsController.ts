import { connect } from "../db/connection";
import { Booking, User, Room } from "../Schemas/schemas";

const bookingsList = async (req, res, next) => {
    connect(null);

    const query = Booking.find();

    await query.exec((err, bookings) => {
        if (err) return next(err);
        res.json(bookings);
    });
}

const bookingsDetail = async (req, res, next) => {
    connect(null);

    const query = Booking.findOne({ "_id": req.params.idbooking });

    await query.exec((err, booking) => {
        if (err) return next(err);
        res.json(booking)
    });
}

const bookingsPost = async (req, res) => {
    connect(null);

    const booking = req.body.booking;
    const userid = booking.user_id;
    const roomid = booking.room_id;

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

    const booking = req.body.booking;
    const userid = booking.user_id;
    const roomid = booking.room_id;

    if (await userExists(userid) && await roomExists(roomid)) {
        const query = Booking.findOneAndUpdate({ "_id": req.params.idbooking }, req.body.booking);

        await query.exec((err, room) => {
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

    await query.exec((err, booking) => {
        if (err) return next(err);

        res.json({
            message: "Room deleted",
            oldbooking: booking
        });
    })
}

/* Function helpers to check the user and room ids */
async function userExists(userid) {
    const userQuery = User.findOne({ "_id": userid });

    return await userQuery.exec()
        .then((result) => result ? true : false);
}

async function roomExists(roomid) {
    const roomQuery = Room.findOne({ "_id": roomid });

    return await roomQuery.exec()
        .then((result) => result ? true : false);
}


export {
    bookingsList,
    bookingsDetail,
    bookingsPost,
    bookingsPut,
    bookingsDelete
}
