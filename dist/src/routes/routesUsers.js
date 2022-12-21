"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = void 0;
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const routerUsers = express_1.default.Router();
exports.routerUsers = routerUsers;
/* GET users listing. */
routerUsers.get('/users', usersController_1.user_list);
/* GET user */
routerUsers.get("/users/:iduser", usersController_1.user_detail);
/* POST a new user. */
routerUsers.post("/users", usersController_1.user_post);
/* PUT an existing user. */
routerUsers.put("/users/:iduser", usersController_1.user_put);
/* DELETE an existing user. */
routerUsers.delete("/users/:iduser", usersController_1.user_delete);
//# sourceMappingURL=routesUsers.js.map