"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDelete = exports.contactPut = exports.contactPost = exports.contactDetail = exports.contactList = void 0;
const connection_1 = require("../db/connection");
const contactList = (req, res, next) => {
    (0, connection_1.dbQuery)("SELECT * FROM contacts;", null)
        .then((contacts) => res.json(contacts))
        .catch((e) => next(e));
};
exports.contactList = contactList;
const contactDetail = (req, res, next) => {
    (0, connection_1.dbQuery)("SELECT * FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then((contact) => res.json(contact))
        .catch((e) => next(e));
};
exports.contactDetail = contactDetail;
const contactPost = (req, res, next) => {
    (0, connection_1.dbQuery)("INSERT INTO contacts SET ?", req.body.contact)
        .then(() => {
        res.json({
            message: "Contact added to database",
            room: req.body.contact
        });
    })
        .catch((e) => next(e));
};
exports.contactPost = contactPost;
const contactPut = (req, res, next) => {
    (0, connection_1.dbQuery)("UPDATE contacts SET ? WHERE idcontact = ?;", [req.body.contact, req.params.idcontact])
        .then(() => {
        res.json({
            message: "Contact updated",
            room: req.body.contact
        });
    })
        .catch((e) => next(e));
};
exports.contactPut = contactPut;
const contactDelete = (req, res, next) => {
    (0, connection_1.dbQuery)("DELETE FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then(() => {
        res.json({
            message: "Contact deleted",
        });
    })
        .catch((e) => next(e));
};
exports.contactDelete = contactDelete;
//# sourceMappingURL=contactsController.js.map