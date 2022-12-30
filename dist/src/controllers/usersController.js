"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userPut = exports.userPost = exports.userDetail = exports.userList = void 0;
const connection_1 = require("../mysql/connection");
const userList = (req, res) => {
    (0, connection_1.dbQuery)("SELECT * FROM users;", null)
        .then((users) => res.json(users));
};
exports.userList = userList;
const userDetail = (req, res) => {
    (0, connection_1.dbQuery)("SELECT * FROM users WHERE iduser = ?;", [req.params.iduser])
        .then((user) => res.json(user));
};
exports.userDetail = userDetail;
const userPost = (req, res) => {
    (0, connection_1.dbQuery)("INSERT INTO users SET ?", req.body.user)
        .then(() => {
        res.json({
            message: "User added to database",
            room: req.body.user
        });
    });
};
exports.userPost = userPost;
const userPut = (req, res) => {
    (0, connection_1.dbQuery)("UPDATE users SET ? WHERE iduser = ?;", [req.body.user, req.params.iduser])
        .then(() => {
        res.json({
            message: "User updated",
            room: req.body.user
        });
    });
};
exports.userPut = userPut;
const userDelete = (req, res) => {
    (0, connection_1.dbQuery)("DELETE FROM users WHERE iduser = ?;", [req.params.iduser])
        .then(() => {
        res.json({
            message: "User deleted",
        });
    });
};
exports.userDelete = userDelete;
//# sourceMappingURL=usersController.js.map