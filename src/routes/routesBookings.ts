import express from "express";

const routerBookings = express.Router();

/** Bookings */
/* GET bookings listing. */
routerBookings.get("/bookings", (req, res) => {
    res.send("Bookings");
})

/* GET booking */
routerBookings.get(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking get");
})

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

export { routerBookings };
