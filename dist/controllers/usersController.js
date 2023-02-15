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
const helpers_1 = require("../helpers/helpers");
const userList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const users = yield schuser_1.User
        .find()
        .exec()
        .catch((e) => next(e));
    res.json(users);
    yield (0, connection_1.disconnect)();
});
exports.userList = userList;
const userDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const user = yield schuser_1.User
        .findOne({ "_id": req.params.iduser })
        .exec()
        .catch((e) => next(e));
    res.json(user);
    yield (0, connection_1.disconnect)();
});
exports.userDetail = userDetail;
const userPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const user = req.body.user;
    user.pass = yield (0, helpers_1.getHashPass)(user.pass);
    yield schuser_1.User
        .create(user)
        .catch((e) => next(e));
    res.json({
        message: "New user posted",
        newuser: user
    });
    yield (0, connection_1.disconnect)();
});
exports.userPost = userPost;
const userPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const user = yield schuser_1.User
        .findOne({ "_id": req.params.iduser })
        .exec()
        .catch((e) => next(e));
    const newuser = req.body.user;
    if (user.pass !== newuser.pass) {
        newuser.pass = yield (0, helpers_1.getHashPass)(newuser.pass);
    }
    yield schuser_1.User
        .findOneAndUpdate({ "_id": req.params.iduser }, newuser)
        .exec()
        .catch((e) => next(e));
    res.json({
        message: "User put",
        olduser: user,
        newuser: newuser
    });
    yield (0, connection_1.disconnect)();
});
exports.userPut = userPut;
const userDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)();
    const user = yield schuser_1.User
        .findOneAndDelete({ "_id": req.params.iduser })
        .exec()
        .catch((e) => next(e));
    res.json({
        message: "User deleted",
        olduser: user
    });
    yield (0, connection_1.disconnect)();
});
exports.userDelete = userDelete;
