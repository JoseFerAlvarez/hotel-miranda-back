import { dbQuery } from "../db/connection";

const bookingsList = (req, res) => {
    dbQuery("SELECT * FROM bookings;", null)
        .then((bookings) => res.json(bookings));
}

const bookingsDetail = (req, res) => {
    dbQuery("SELECT * FROM bookings WHERE idbooking = ?;", [req.params.idbooking])
        .then((booking) => res.json(booking));
}

const bookingsPost = (req, res) => {
    dbQuery("INSERT INTO bookings SET ?", req.body.booking)
        .then(() => {
            res.json({
                message: "Booking added to database",
                room: req.body.booking
            })
        });
}

const bookingsPut = (req, res) => {
    dbQuery("UPDATE bookings SET ? WHERE idbooking = ?;", [req.body.booking, req.params.idbooking])
        .then(() => {
            res.json({
                message: "Booking updated",
                room: req.body.booking
            })
        })
}

const bookingsDelete = (req, res) => {
    dbQuery("DELETE FROM bookings WHERE idbooking = ?;", [req.params.idbooking])
        .then(() => {
            res.json({
                message: "Booking deleted",
            })
        })
}

export {
    bookingsList,
    bookingsDetail,
    bookingsPost,
    bookingsPut,
    bookingsDelete
}
