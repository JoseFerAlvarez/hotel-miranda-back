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
const connection_1 = require("../db/connection");
const schroom_1 = require("../Schemas/schroom");
const roomList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schroom_1.Room.find();
    yield query.exec((err, rooms) => {
        if (err)
            return next(err);
        res.json(rooms);
    });
});
exports.roomList = roomList;
const roomDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schroom_1.Room.findOne({ "_id": req.params.idroom });
    yield query.exec((err, room) => {
        if (err)
            return next(err);
        res.json(room);
    });
});
exports.roomDetail = roomDetail;
const roomPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    yield schroom_1.Room.create(req.body.room);
    res.json({
        message: "New room posted",
    });
});
exports.roomPost = roomPost;
const roomPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schroom_1.Room.findOneAndUpdate({ "_id": req.params.idroom }, req.body.room);
    yield query.exec((err, room) => {
        if (err)
            return next(err);
        res.json({
            message: "Room put",
            room: room
        });
    });
});
exports.roomPut = roomPut;
const roomDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = schroom_1.Room.findOneAndDelete({ "_id": req.params.idroom });
    yield query.exec((err, room) => {
        if (err)
            return next(err);
        res.json({
            message: "Room delete",
            room: room
        });
    });
});
exports.roomDelete = roomDelete;
//# sourceMappingURL=roomsController.js.map