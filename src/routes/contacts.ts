import express from "express";
const router = express.Router();

/* GET contacts listing. */
router.get("/", (req, res) => {
    res.send("Contacts");
})

/* POST a new contact. */
router.post("/", (req, res) => {
    res.send("Contact post");
});

/* PUT an existing contact. */
router.put(("/contact"), (req, res) => {
    res.send("Contact put");
})

/* DELETE an existing contact. */
router.delete(("/contact"), (req, res) => {
    res.send("Contact delete");
});

module.exports = router;
