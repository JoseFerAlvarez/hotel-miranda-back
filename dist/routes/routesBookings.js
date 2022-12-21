"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBookings = void 0;
const express_1 = __importDefault(require("express"));
const bookingsController_1 = require("../controllers/bookingsController");
const routerBookings = express_1.default.Router();
exports.routerBookings = routerBookings;
/* GET bookings listing. */
routerBookings.get("/bookings", bookingsController_1.bookings_list);
/* GET booking */
routerBookings.get(("/bookings/:idbooking"), bookingsController_1.bookings_detail);
/* POST a new booking. */
routerBookings.post(("/bookings"), bookingsController_1.bookings_post);
/* PUT an existing booking. */
routerBookings.put(("/bookings/:idbooking"), bookingsController_1.bookings_put);
/* DELETE an existing booking. */
routerBookings.delete(("/bookings/:idbooking"), bookingsController_1.bookings_delete);
//# sourceMappingURL=routesBookings.js.map