"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsDelete = exports.bookingsPut = exports.bookingsPost = exports.bookingsDetail = exports.bookingsList = void 0;
const bookingsList = (req, res) => {
    res.json({});
};
exports.bookingsList = bookingsList;
const bookingsDetail = (req, res) => {
    res.json({});
};
exports.bookingsDetail = bookingsDetail;
const bookingsPost = (req, res) => {
    res.json({
        message: "New room posted"
    });
};
exports.bookingsPost = bookingsPost;
const bookingsPut = (req, res) => {
    res.json({
        message: "Room put"
    });
};
exports.bookingsPut = bookingsPut;
const bookingsDelete = (req, res) => {
    res.json({
        message: "Room delete"
    });
};
exports.bookingsDelete = bookingsDelete;
//# sourceMappingURL=bookingsController.js.map