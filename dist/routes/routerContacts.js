"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerContacts = express_1.default.Router();
/* GET contacts listing. */
routerContacts.get("/contacts", (req, res) => {
    res.send("Contacts");
});
/* GET Contact */
routerContacts.get(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact get");
});
/* POST a new contact. */
routerContacts.post("/contacts", (req, res) => {
    res.send("Contact post");
});
/* PUT an existing contact. */
routerContacts.put(("/contact/:idcontact"), (req, res) => {
    res.send("Contact put");
});
/* DELETE an existing contact. */
routerContacts.delete(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact delete");
});
exports.default = routerContacts;
//# sourceMappingURL=routerContacts.js.map