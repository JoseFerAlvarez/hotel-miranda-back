"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact_delete = exports.contact_put = exports.contact_post = exports.contact_detail = exports.contact_list = void 0;
const guest_json_1 = __importDefault(require("../db/guest.json"));
const contact_list = (req, res) => {
    res.send(guest_json_1.default);
};
exports.contact_list = contact_list;
const contact_detail = (req, res) => {
    res.send(guest_json_1.default.find(contact => Number(contact.id) === Number(req.params.idcontact)));
};
exports.contact_detail = contact_detail;
const contact_post = (req, res) => {
    res.send("New room posted");
};
exports.contact_post = contact_post;
const contact_put = (req, res) => {
    res.send("Room put");
};
exports.contact_put = contact_put;
const contact_delete = (req, res) => {
    res.send("Room delete");
};
exports.contact_delete = contact_delete;
//# sourceMappingURL=contactsController.js.map