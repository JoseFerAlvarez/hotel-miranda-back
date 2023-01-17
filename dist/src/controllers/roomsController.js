"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomDelete = exports.roomPut = exports.roomPost = exports.roomDetail = exports.roomList = void 0;
const connection_1 = require("../db/connection");
const roomList = (req, res, next) => {
    (0, connection_1.dbQuery)("SELECT * FROM rooms;", null)
        .then((rooms) => res.json(rooms))
        .catch((e) => next(e));
};
exports.roomList = roomList;
const roomDetail = (req, res, next) => {
    (0, connection_1.dbQuery)("SELECT * FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then((room) => res.json(room))
        .catch((e) => next(e));
};
exports.roomDetail = roomDetail;
const roomPost = (req, res, next) => {
    (0, connection_1.dbQuery)("INSERT INTO rooms SET ?", req.body.room)
        .then(() => {
        res.json({
            message: "Room added to database",
            room: req.body.room
        });
    })
        .catch((e) => next(e));
};
exports.roomPost = roomPost;
const roomPut = (req, res, next) => {
    (0, connection_1.dbQuery)("UPDATE rooms SET ? WHERE idroom = ?;", [req.body.room, req.params.idroom])
        .then(() => {
        res.json({
            message: "Room updated",
            room: req.body.room
        });
    })
        .catch((e) => next(e));
};
exports.roomPut = roomPut;
const roomDelete = (req, res, next) => {
    (0, connection_1.dbQuery)("DELETE FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then(() => {
        res.json({
            message: "Room deleted",
        });
    })
        .catch((e) => next(e));
};
exports.roomDelete = roomDelete;
//# sourceMappingURL=roomsController.js.map