import express from "express";
import {
    contact_delete,
    contact_detail,
    contact_list,
    contact_post,
    contact_put
} from "../controllers/contactsController";
const routerContacts = express.Router();

/* GET contacts listing. */
routerContacts.get("/contacts", contact_list)

/* GET Contact */
routerContacts.get(("/contacts/:idcontact"), contact_detail)

/* POST a new contact. */
routerContacts.post("/contacts", contact_post);

/* PUT an existing contact. */
routerContacts.put(("/contact/:idcontact"), contact_put)

/* DELETE an existing contact. */
routerContacts.delete(("/contacts/:idcontact"), contact_delete);

export { routerContacts }
