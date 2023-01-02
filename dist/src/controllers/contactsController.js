"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDelete = exports.contactPut = exports.contactPost = exports.contactDetail = exports.contactList = void 0;
const contactList = (req, res) => {
    res.json({});
};
exports.contactList = contactList;
const contactDetail = (req, res) => {
    res.json({});
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