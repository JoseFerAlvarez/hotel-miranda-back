import express from "express";
import {
    bookings_delete,
    bookings_detail,
    bookings_list,
    bookings_post,
    bookings_put
} from "../controllers/bookingsController";

const routerBookings = express.Router();

/* GET bookings listing. */
routerBookings.get("/bookings", bookings_list)

/* GET booking */
routerBookings.get(("/bookings/:idbooking"), bookings_detail)

/* POST a new booking. */
routerBookings.post(("/bookings"), bookings_post);

/* PUT an existing booking. */
routerBookings.put(("/bookings/:idbooking"), bookings_put);

/* DELETE an existing booking. */
routerBookings.delete(("/bookings/:idbooking"), bookings_delete);

export { routerBookings };
