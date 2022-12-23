"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsDelete = exports.bookingsPut = exports.bookingsPost = exports.bookingsDetail = exports.bookingsList = void 0;
const guest_json_1 = __importDefault(require("../db/guest.json"));
const bookingsList = (req, res) => {
    res.json(guest_json_1.default);
};
exports.bookingsList = bookingsList;
const bookingsDetail = (req, res) => {
    res.json(guest_json_1.default.find((booking) => Number(booking.id) === Number(req.params.idbooking)));
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