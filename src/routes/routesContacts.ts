import express from "express";
const routerContacts = express.Router();

/** Contacts */
/* GET contacts listing. */
routerContacts.get("/contacts", (req, res) => {
    res.send("Contacts");
})

/* GET Contact */
routerContacts.get(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact get");
})

/* POST a new contact. */
routerContacts.post("/contacts", (req, res) => {
    res.send("Contact post");
});

/* PUT an existing contact. */
routerContacts.put(("/contact/:idcontact"), (req, res) => {
    res.send("Contact put");
})

/* DELETE an existing contact. */
routerContacts.delete(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact delete");
});

export { routerContacts }
