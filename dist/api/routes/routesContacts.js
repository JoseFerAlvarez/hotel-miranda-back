"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactsController_1 = require("../controllers/contactsController");
const routerContacts = express_1.default.Router();
/* GET contacts listing. */
routerContacts.get('/', contactsController_1.contactList);
/* GET Contact */
routerContacts.get(('/:idcontact'), contactsController_1.contactDetail);
/* POST a new contact. */
routerContacts.post('/', contactsController_1.contactPost);
/* PUT an existing contact. */
routerContacts.put(('/:idcontact'), contactsController_1.contactPut);
/* DELETE an existing contact. */
routerContacts.delete(('/:idcontact'), contactsController_1.contactDelete);
exports.default = routerContacts;
//# sourceMappingURL=routesContacts.js.map