"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDelete = exports.contactPut = exports.contactPost = exports.contactDetail = exports.contactList = void 0;
const connection_1 = require("../db/connection");
const schcontact_1 = require("../Schemas/schcontact");
const contactList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schcontact_1.Contact.find();
    yield query.exec((err, contacts) => {
        if (err)
            return next(err);
        res.json(contacts);
    });
});
exports.contactList = contactList;
const contactDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schcontact_1.Contact.findOne({ "_id": req.params.idcontact });
    yield query.exec((err, contact) => {
        if (err)
            return next(err);
        res.json(contact);
    });
});
exports.contactDetail = contactDetail;
const contactPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    yield schcontact_1.Contact.create(req.body.contact);
    res.json({
        message: "New contact posted",
        newcontact: req.body.contact
    });
});
exports.contactPost = contactPost;
const contactPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schcontact_1.Contact.findOneAndUpdate({ "_id": req.params.idcontact }, req.body.contact);
    yield query.exec((err, contact) => {
        if (err)
            return next(err);
        res.json({
            message: "Contact put",
            oldcontact: contact,
            newcontact: req.body.contact
        });
    });
});
exports.contactPut = contactPut;
const contactDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = schcontact_1.Contact.findOneAndDelete({ "_id": req.params.idcontact });
    yield query.exec((err, contact) => {
        if (err)
            return next(err);
        res.json({
            message: "Contact deleted",
            oldcontact: contact
        });
    });
});
exports.contactDelete = contactDelete;
//# sourceMappingURL=contactsController.js.map