"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_delete = exports.user_put = exports.user_post = exports.user_detail = exports.user_list = void 0;
const users_json_1 = __importDefault(require("../db/users.json"));
const user_list = (req, res) => {
    res.send(users_json_1.default);
};
exports.user_list = user_list;
const user_detail = (req, res) => {
    res.send(users_json_1.default.find((user) => Number(user.id) === Number(req.params.iduser)));
};
exports.user_detail = user_detail;
const user_post = (req, res) => {
    res.send("New user posted");
};
exports.user_post = user_post;
const user_put = (req, res) => {
    res.send("User put");
};
exports.user_put = user_put;
const user_delete = (req, res) => {
    res.send("User delete");
};
exports.user_delete = user_delete;
//# sourceMappingURL=usersController.js.map