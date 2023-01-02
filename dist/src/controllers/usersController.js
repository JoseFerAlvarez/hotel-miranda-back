"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userPut = exports.userPost = exports.userDetail = exports.userList = void 0;
const userList = (req, res) => {
    res.json({});
};
exports.userList = userList;
const userDetail = (req, res) => {
    res.json({});
};
exports.userDetail = userDetail;
const userPost = (req, res) => {
    res.json({
        message: "New user posted"
    });
};
exports.userPost = userPost;
const userPut = (req, res) => {
    res.json({
        message: "User put"
    });
};
exports.userPut = userPut;
const userDelete = (req, res) => {
    res.json({
        message: "User delete"
    });
};
exports.userDelete = userDelete;
//# sourceMappingURL=usersController.js.map