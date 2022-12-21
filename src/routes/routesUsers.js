"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.routerUsers = void 0;
var express_1 = __importDefault(require("express"));
var routerUsers = express_1["default"].Router();
exports.routerUsers = routerUsers;
/** Users */
/* GET users listing. */
routerUsers.get('/users', function (req, res) {
    res.send('Users');
});
/* GET user */
routerUsers.get("/users/:iduser", function (req, res) {
    res.send("User get");
});
/* POST a new user. */
routerUsers.post("/users", function (req, res) {
    res.send("User post");
});
/* PUT an existing user. */
routerUsers.put("/users/:iduser", function (req, res) {
    res.send("User put");
});
/* DELETE an existing user. */
routerUsers["delete"]("/users/:iduser", function (req, res) {
    res.send("User delete");
});
