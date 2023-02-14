"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const routerUsers = express_1.default.Router();
/* GET users listing. */
routerUsers.get('/', usersController_1.userList);
/* GET user */
routerUsers.get('/:iduser', usersController_1.userDetail);
/* POST a new user. */
routerUsers.post('/', usersController_1.userPost);
/* PUT an existing user. */
routerUsers.put('/:iduser', usersController_1.userPut);
/* DELETE an existing user. */
routerUsers.delete('/:iduser', usersController_1.userDelete);
exports.default = routerUsers;
//# sourceMappingURL=routesUsers.js.map