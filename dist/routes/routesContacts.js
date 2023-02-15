"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactsController_1 = require("../controllers/contactsController");
const routerContacts = express_1.default.Router();
routerContacts.get('/', contactsController_1.contactList);
routerContacts.get(('/:idcontact'), contactsController_1.contactDetail);
routerContacts.post('/', contactsController_1.contactPost);
routerContacts.put(('/:idcontact'), contactsController_1.contactPut);
routerContacts.delete(('/:idcontact'), contactsController_1.contactDelete);
exports.default = routerContacts;
