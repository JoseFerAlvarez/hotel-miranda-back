import { dbQuery } from "../db/connection";
import { IntBooking } from "../interfaces/interfaces";

const bookingsList = (req, res, next): void => {
    dbQuery("SELECT * FROM bookings;", null)
        .then((bookings: IntBooking[]) => res.json(bookings))
        .catch((e: Error): void => next(e));
};

const bookingsDetail = (req, res, next): void => {
    dbQuery("SELECT * FROM bookings WHERE idbooking = ?;", [req.params.idbooking])
        .then((booking: IntBooking): void => res.json(booking))
        .catch((e: Error): void => next(e));
};

const bookingsPost = (req, res, next): void => {
    dbQuery("INSERT INTO bookings SET ?", req.body.booking)
        .then((): void => {
            res.json({
                message: "Booking added to database",
                room: req.body.booking
            })
        })
        .catch((e: Error): void => next(e));
};

const bookingsPut = (req, res, next): void => {
    dbQuery("UPDATE bookings SET ? WHERE idbooking = ?;", [req.body.booking, req.params.idbooking])
        .then((): void => {
            res.json({
                message: "Booking updated",
                room: req.body.booking
            })
        })
        .catch((e: Error): void => next(e));
};

const bookingsDelete = (req, res, next): void => {
    dbQuery("DELETE FROM bookings WHERE idbooking = ?;", [req.params.idbooking])
        .then((): void => {
            res.json({
                message: "Booking deleted",
            })
        })
        .catch((e: Error): void => next(e));
}

export {
    bookingsList,
    bookingsDetail,
    bookingsPost,
    bookingsPut,
    bookingsDelete
}
