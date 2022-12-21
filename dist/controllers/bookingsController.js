"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookings_delete = exports.bookings_put = exports.bookings_post = exports.bookings_detail = exports.bookings_list = void 0;
const guest_json_1 = __importDefault(require("../db/guest.json"));
const bookings_list = (req, res) => {
    res.send(guest_json_1.default);
};
exports.bookings_list = bookings_list;
const bookings_detail = (req, res) => {
    res.send(guest_json_1.default.find(booking => Number(booking.id) === Number(req.params.idbooking)));
};
exports.bookings_detail = bookings_detail;
const bookings_post = (req, res) => {
    res.send("New room posted");
};
exports.bookings_post = bookings_post;
const bookings_put = (req, res) => {
    res.send("Room put");
};
exports.bookings_put = bookings_put;
const bookings_delete = (req, res) => {
    res.send("Room delete");
};
exports.bookings_delete = bookings_delete;
//# sourceMappingURL=bookingsController.js.map