import express from "express";
const router = express.Router();

/* GET bookings listing. */
router.get("/bookings", (req, res) => {
    res.send("Bookings");
})

/* GET booking */
router.get(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking get");
})

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
