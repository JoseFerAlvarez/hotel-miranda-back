"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userPut = exports.userPost = exports.userDetail = exports.userList = void 0;
const users_json_1 = __importDefault(require("../db/users.json"));
const userList = (req, res) => {
    res.json(users_json_1.default);
};
exports.userList = userList;
const userDetail = (req, res) => {
    res.json(users_json_1.default.find((user) => Number(user.id) === Number(req.params.iduser)));
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