"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsDelete = exports.bookingsPut = exports.bookingsPost = exports.bookingsDetail = exports.bookingsList = void 0;
const connection_1 = require("../mysql/connection");
const bookingsList = (req, res) => {
    (0, connection_1.dbQuery)("SELECT * FROM bookings;", null)
        .then((bookings) => res.json(bookings));
};
exports.bookingsList = bookingsList;
const bookingsDetail = (req, res) => {
    (0, connection_1.dbQuery)("SELECT * FROM bookings WHERE idbooking = ?;", [req.params.idbooking])
        .then((booking) => res.json(booking));
};
exports.bookingsDetail = bookingsDetail;
const bookingsPost = (req, res) => {
    (0, connection_1.dbQuery)("INSERT INTO bookings SET ?", req.body.booking)
        .then(() => {
        res.json({
            message: "Booking added to database",
            room: req.body.booking
        });
    });
};
exports.bookingsPost = bookingsPost;
const bookingsPut = (req, res) => {
    (0, connection_1.dbQuery)("UPDATE bookings SET ? WHERE idbooking = ?;", [req.body.booking, req.params.idbooking])
        .then(() => {
        res.json({
            message: "Booking updated",
            room: req.body.booking
        });
    });
};
exports.bookingsPut = bookingsPut;
const bookingsDelete = (req, res) => {
    (0, connection_1.dbQuery)("DELETE FROM bookings WHERE idbooking = ?;", [req.params.idbooking])
        .then(() => {
        res.json({
            message: "Booking deleted",
        });
    });
};
exports.bookingsDelete = bookingsDelete;
//# sourceMappingURL=bookingsController.js.map