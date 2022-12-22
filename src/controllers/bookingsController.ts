import bookings from "../db/guest.json";
import { Booking } from "src/interfaces/Booking";

const bookings_list = (req, res) => {
    res.send(bookings);
}

const bookings_detail = (req, res) => {
    res.send(bookings.find((booking: Booking) => Number(booking.id) === Number(req.params.idbooking)));
}

const bookings_post = (req, res) => {
    res.send("New room posted");
}

const bookings_put = (req, res) => {
    res.send("Room put");
}

const bookings_delete = (req, res) => {
    res.send("Room delete");
}

export {
    bookings_list,
    bookings_detail,
    bookings_post,
    bookings_put,
    bookings_delete
}
