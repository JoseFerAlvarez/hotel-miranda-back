"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET bookings listing. */
router.get("/bookings", (req, res) => {
    res.send("Bookings");
});
/* GET booking */
router.get(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking get");
});
/* POST a new booking. */
router.post(("/bookings"), (req, res) => {
    res.send("Booking post");
});
/* PUT an existing booking. */
router.put(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking put");
});
/* DELETE an existing booking. */
router.delete(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking delete");
});
//# sourceMappingURL=bookings.js.map