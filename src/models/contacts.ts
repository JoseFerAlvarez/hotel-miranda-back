import express from "express";
const router = express.Router();

/* GET contacts listing. */
router.get("/contacts", (req, res) => {
    res.send("Contacts");
})

/* GET Contact */
router.get(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact get");
})

/* POST a new contact. */
router.post("/contacts", (req, res) => {
    res.send("Contact post");
});

/* PUT an existing contact. */
router.put(("/contact/:idcontact"), (req, res) => {
    res.send("Contact put");
})

/* DELETE an existing contact. */
router.delete(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact delete");
});

module.exports = router;
