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
exports.userDelete = exports.userPut = exports.userPost = exports.userDetail = exports.userList = void 0;
const connection_1 = require("../db/connection");
const schuser_1 = require("../Schemas/schuser");
const userList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schuser_1.User.find();
    yield query.exec((err, users) => {
        if (err)
            return next(err);
        res.json(users);
    });
});
exports.userList = userList;
const userDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schuser_1.User.findOne({ "_id": req.params.iduser });
    yield query.exec((err, user) => {
        if (err)
            return next(err);
        res.json(user);
    });
});
exports.userDetail = userDetail;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    yield schuser_1.User.create(req.body.user);
    res.json({
        message: "New user posted",
        newuser: req.body.user
    });
});
exports.userPost = userPost;
const userPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    const query = schuser_1.User.findOneAndUpdate({ "_id": req.params.iduser }, req.body.user);
    yield query.exec((err, user) => {
        if (err)
            return next(err);
        res.json({
            message: "Room put",
            olduser: user,
            newuser: req.body.user
        });
    });
});
exports.userPut = userPut;
const userDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = schuser_1.User.findOneAndDelete({ "_id": req.params.iduser });
    yield query.exec((err, user) => {
        if (err)
            return next(err);
        res.json({
            message: "Room delete",
            olduser: user
        });
    });
});
exports.userDelete = userDelete;
//# sourceMappingURL=usersController.js.map