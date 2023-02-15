"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const routerUsers = express_1.default.Router();
routerUsers.get('/', usersController_1.userList);
routerUsers.get('/:iduser', usersController_1.userDetail);
routerUsers.post('/', usersController_1.userPost);
routerUsers.put('/:iduser', usersController_1.userPut);
routerUsers.delete('/:iduser', usersController_1.userDelete);
exports.default = routerUsers;
