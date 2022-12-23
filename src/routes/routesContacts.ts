import express from "express";
import {
    contactDelete,
    contactDetail,
    contactList,
    contactPost,
    contactPut
} from "../controllers/contactsController";
const routerContacts = express.Router();

/* GET contacts listing. */
routerContacts.get('/', contactList)

/* GET Contact */
routerContacts.get(('/:idcontact'), contactDetail)

/* POST a new contact. */
routerContacts.post('/', contactPost);

/* PUT an existing contact. */
routerContacts.put(('/:idcontact'), contactPut)

/* DELETE an existing contact. */
routerContacts.delete(('/:idcontact'), contactDelete);

export default routerContacts;
