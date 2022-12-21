"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerContacts = void 0;
const express_1 = __importDefault(require("express"));
const contactsController_1 = require("../controllers/contactsController");
const routerContacts = express_1.default.Router();
exports.routerContacts = routerContacts;
/* GET contacts listing. */
routerContacts.get("/contacts", contactsController_1.contact_list);
/* GET Contact */
routerContacts.get(("/contacts/:idcontact"), contactsController_1.contact_detail);
/* POST a new contact. */
routerContacts.post("/contacts", contactsController_1.contact_post);
/* PUT an existing contact. */
routerContacts.put(("/contact/:idcontact"), contactsController_1.contact_put);
/* DELETE an existing contact. */
routerContacts.delete(("/contacts/:idcontact"), contactsController_1.contact_delete);
//# sourceMappingURL=routesContacts.js.map