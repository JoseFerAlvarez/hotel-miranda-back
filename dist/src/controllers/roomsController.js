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
exports.roomDelete = exports.roomPut = exports.roomPost = exports.roomDetail = exports.roomList = void 0;
const connection_1 = require("../mysql/connection");
const roomList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.dbQuery)("SELECT * FROM rooms;", null)
        .then((rooms) => res.json(rooms));
});
exports.roomList = roomList;
const roomDetail = (req, res) => {
    (0, connection_1.dbQuery)("SELECT * FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then((rooms) => res.json(rooms));
};
exports.roomDetail = roomDetail;
const roomPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.dbQuery)("INSERT INTO rooms SET ?", req.body.room)
        .then(() => {
        res.json({
            message: "Room added to database",
            room: req.body.room
        });
    });
});
exports.roomPost = roomPost;
const roomPut = (req, res) => {
    (0, connection_1.dbQuery)("UPDATE rooms SET ? WHERE idroom = ?;", [req.body.room, req.params.idroom])
        .then(() => {
        res.json({
            message: "Room updated",
            room: req.body.room
        });
    });
};
exports.roomPut = roomPut;
const roomDelete = (req, res) => {
    (0, connection_1.dbQuery)("DELETE FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then(() => {
        res.json({
            message: "Room deleted",
            room: req.body.room
        });
    });
};
exports.roomDelete = roomDelete;
//# sourceMappingURL=roomsController.js.map