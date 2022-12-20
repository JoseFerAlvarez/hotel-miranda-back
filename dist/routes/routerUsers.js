"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerUsers = express_1.default.Router();
/* GET users listing. */
routerUsers.get('/users', (req, res) => {
    res.send('Users');
});
/* GET user */
routerUsers.get("/users/:iduser", (req, res) => {
    res.send("User get");
});
/* POST a new user. */
routerUsers.post("/users", (req, res) => {
    res.send("User post");
});
/* PUT an existing user. */
routerUsers.put("/users/:iduser", (req, res) => {
    res.send("User put");
});
/* DELETE an existing user. */
routerUsers.delete("/users/:iduser", (req, res) => {
    res.send("User delete");
});
exports.default = routerUsers;
//# sourceMappingURL=routerUsers.js.map