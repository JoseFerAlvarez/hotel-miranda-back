import express from "express";
const router = express.Router();

/* GET bookings listing. */
router.get("/", (req, res) => {
    res.send("Bookings");
})

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
