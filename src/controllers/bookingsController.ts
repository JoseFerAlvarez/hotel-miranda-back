import bookings from "../db/guest.json";
import { Booking } from "../interfaces/interfaces";

const bookingsList = (req, res) => {
    res.json(bookings);
}

const bookingsDetail = (req, res) => {
    res.json(bookings.find((booking: Booking) => Number(booking.id) === Number(req.params.idbooking)));
}

const bookingsPost = (req, res) => {
    res.json({
        message: "New room posted"
    });
}

const bookingsPut = (req, res) => {
    res.json({
        message: "Room put"
    });
}

const bookingsDelete = (req, res) => {
    res.json({
        message: "Room delete"
    });
}

export {
    bookingsList,
    bookingsDetail,
    bookingsPost,
    bookingsPut,
    bookingsDelete
}
