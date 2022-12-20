import express from "express";
const router = express.Router();

/* GET rooms listing. */
router.get("/", (req, res) => {
    res.send("Rooms");
})

/* POST a new room. */
router.post("/", (req, res) => {
    res.send("Room post");
})

/* PUT an existing room. */
router.put("/room", (req, res) => {
    res.send("Room put");
})

/* DELETE an existing user. */
router.delete("/room", (req, res) => {
    res.send("Room deleted")
})

module.exports = router;
