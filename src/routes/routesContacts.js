"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.routerContacts = void 0;
var express_1 = __importDefault(require("express"));
var routerContacts = express_1["default"].Router();
exports.routerContacts = routerContacts;
/** Contacts */
/* GET contacts listing. */
routerContacts.get("/contacts", function (req, res) {
    res.send("Contacts");
});
/* GET Contact */
routerContacts.get(("/contacts/:idcontact"), function (req, res) {
    res.send("Contact get");
});
/* POST a new contact. */
routerContacts.post("/contacts", function (req, res) {
    res.send("Contact post");
});
/* PUT an existing contact. */
routerContacts.put(("/contact/:idcontact"), function (req, res) {
    res.send("Contact put");
});
/* DELETE an existing contact. */
routerContacts["delete"](("/contacts/:idcontact"), function (req, res) {
    res.send("Contact delete");
});
