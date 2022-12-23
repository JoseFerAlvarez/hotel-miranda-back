import express from "express";
import {
    bookingsDelete,
    bookingsDetail,
    bookingsList,
    bookingsPost,
    bookingsPut
} from "../controllers/bookingsController";

const routerBookings = express.Router();

/* GET bookings listing. */
routerBookings.get('/', bookingsList)

/* GET booking */
routerBookings.get(('/:idbooking'), bookingsDetail)

/* POST a new booking. */
routerBookings.post(('/'), bookingsPost);

/* PUT an existing booking. */
routerBookings.put(('/:idbooking'), bookingsPut);

/* DELETE an existing booking. */
routerBookings.delete(('/:idbooking'), bookingsDelete);

export default routerBookings;
