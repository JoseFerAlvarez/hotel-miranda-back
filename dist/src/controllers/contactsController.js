"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDelete = exports.contactPut = exports.contactPost = exports.contactDetail = exports.contactList = void 0;
const guest_json_1 = __importDefault(require("../db/guest.json"));
const contactList = (req, res) => {
    res.json(guest_json_1.default);
};
exports.contactList = contactList;
const contactDetail = (req, res) => {
    res.json(guest_json_1.default.find((contact) => Number(contact.id) === Number(req.params.idcontact)));
};
exports.contactDetail = contactDetail;
const contactPost = (req, res) => {
    res.json({
        message: "New room posted"
    });
};
exports.contactPost = contactPost;
const contactPut = (req, res) => {
    res.json({
        message: "Room put"
    });
};
exports.contactPut = contactPut;
const contactDelete = (req, res) => {
    res.json({
        message: "Room delete"
    });
};
exports.contactDelete = contactDelete;
//# sourceMappingURL=contactsController.js.map