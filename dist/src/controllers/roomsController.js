"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.room_delete = exports.room_put = exports.room_post = exports.room_detail = exports.room_list = void 0;
const rooms_json_1 = __importDefault(require("../db/rooms.json"));
const room_list = (req, res) => {
    res.send(rooms_json_1.default);
};
exports.room_list = room_list;
const room_detail = (req, res) => {
    res.send(rooms_json_1.default.find((room) => Number(room.id) === Number(req.params.idroom)));
};
exports.room_detail = room_detail;
const room_post = (req, res) => {
    res.send("New room posted");
};
exports.room_post = room_post;
const room_put = (req, res) => {
    res.send("Room put");
};
exports.room_put = room_put;
const room_delete = (req, res) => {
    res.send("Room delete");
};
exports.room_delete = room_delete;
//# sourceMappingURL=roomsController.js.map