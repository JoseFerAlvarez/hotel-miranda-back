"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBookings = void 0;
const express_1 = __importDefault(require("express"));
const routerBookings = express_1.default.Router();
exports.routerBookings = routerBookings;
/** Bookings */
/* GET bookings listing. */
routerBookings.get("/bookings", (req, res) => {
    res.send("Bookings");
});
/* GET booking */
routerBookings.get(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking get");
});
/* POST a new booking. */
routerBookings.post(("/bookings"), (req, res) => {
    res.send("Booking post");
});
/* PUT an existing booking. */
routerBookings.put(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking put");
});
/* DELETE an existing booking. */
routerBookings.delete(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking delete");
});
//# sourceMappingURL=routesBookings.js.map