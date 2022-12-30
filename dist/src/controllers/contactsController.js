"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDelete = exports.contactPut = exports.contactPost = exports.contactDetail = exports.contactList = void 0;
const connection_1 = require("../mysql/connection");
const contactList = (req, res) => {
    (0, connection_1.dbQuery)("SELECT * FROM contacts;", null)
        .then((contacts) => res.json(contacts));
};
exports.contactList = contactList;
const contactDetail = (req, res) => {
    (0, connection_1.dbQuery)("SELECT * FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then((contact) => res.json(contact));
};
exports.contactDetail = contactDetail;
const contactPost = (req, res) => {
    (0, connection_1.dbQuery)("INSERT INTO contacts SET ?", req.body.contact)
        .then(() => {
        res.json({
            message: "Contact added to database",
            room: req.body.contact
        });
    });
};
exports.contactPost = contactPost;
const contactPut = (req, res) => {
    (0, connection_1.dbQuery)("UPDATE contacts SET ? WHERE idcontact = ?;", [req.body.contact, req.params.idcontact])
        .then(() => {
        res.json({
            message: "Contact updated",
            room: req.body.contact
        });
    });
};
exports.contactPut = contactPut;
const contactDelete = (req, res) => {
    (0, connection_1.dbQuery)("DELETE FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then(() => {
        res.json({
            message: "Contact deleted",
        });
    });
};
exports.contactDelete = contactDelete;
//# sourceMappingURL=contactsController.js.map