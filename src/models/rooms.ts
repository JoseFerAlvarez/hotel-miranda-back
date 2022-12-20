import express from "express";
const router = express.Router();

/* GET rooms listing. */
router.get("/rooms", (req, res) => {
    res.send("Rooms get");
})

/* GET room */
router.get(("/rooms/:idroom"), (req, res) => {
    res.send("Room get");
});

/* POST a new room. */
router.post("/rooms", (req, res) => {
    res.send("Room post");
})

/* PUT an existing room. */
router.put("/room/:idroom", (req, res) => {
    res.send("Room put");
})

/* DELETE an existing room. */
router.delete("/room/:idroom", (req, res) => {
    res.send("Room deleted")
})

module.exports = router;
