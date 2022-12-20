"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET bookings listing. */
router.get("/", (req, res) => {
    res.send("Bookings");
});
/* POST a new booking. */
router.post(("/"), (req, res) => {
    res.send("Booking post");
});
/* PUT an existing booking. */
router.put(("/booking"), (req, res) => {
    res.send("Booking put");
});
/* DELETE an existing booking. */
router.delete(("/booking"), (req, res) => {
    res.send("Booking delete");
});
//# sourceMappingURL=bookings.js.map