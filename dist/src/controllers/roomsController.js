"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomDelete = exports.roomPut = exports.roomPost = exports.roomDetail = exports.roomList = void 0;
const rooms_json_1 = __importDefault(require("../db/rooms.json"));
const roomList = (req, res) => {
    res.json(rooms_json_1.default);
};
exports.roomList = roomList;
const roomDetail = (req, res) => {
    res.json(rooms_json_1.default.find((room) => Number(room.id) === Number(req.params.idroom)));
};
exports.roomDetail = roomDetail;
const roomPost = (req, res) => {
    res.json({
        message: "New room posted"
    });
};
exports.roomPost = roomPost;
const roomPut = (req, res) => {
    res.json({
        message: "Room put"
    });
};
exports.roomPut = roomPut;
const roomDelete = (req, res) => {
    res.json({
        message: "Room delete"
    });
};
exports.roomDelete = roomDelete;
//# sourceMappingURL=roomsController.js.map