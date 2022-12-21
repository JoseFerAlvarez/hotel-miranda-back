"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.routerBookings = void 0;
var express_1 = __importDefault(require("express"));
var routerBookings = express_1["default"].Router();
exports.routerBookings = routerBookings;
/** Bookings */
/* GET bookings listing. */
routerBookings.get("/bookings", function (req, res) {
    res.send("Bookings");
});
/* GET booking */
routerBookings.get(("/bookings/:idbooking"), function (req, res) {
    res.send("Booking get");
});
/* POST a new booking. */
routerBookings.post(("/bookings"), function (req, res) {
    res.send("Booking post");
});
/* PUT an existing booking. */
routerBookings.put(("/bookings/:idbooking"), function (req, res) {
    res.send("Booking put");
});
/* DELETE an existing booking. */
routerBookings["delete"](("/bookings/:idbooking"), function (req, res) {
    res.send("Booking delete");
});
