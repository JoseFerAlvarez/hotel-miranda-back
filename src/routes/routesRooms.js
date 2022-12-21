"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.routerRooms = void 0;
var express_1 = __importDefault(require("express"));
var routerRooms = express_1["default"].Router();
exports.routerRooms = routerRooms;
/** Rooms */
/* GET rooms listing. */
routerRooms.get("/rooms", function (req, res) {
    res.send("Rooms get");
});
/* GET room */
routerRooms.get(("/rooms/:idroom"), function (req, res) {
    res.send("Room get");
});
/* POST a new room. */
routerRooms.post("/rooms", function (req, res) {
    res.send("Room post");
});
/* PUT an existing room. */
routerRooms.put("/room/:idroom", function (req, res) {
    res.send("Room put");
});
/* DELETE an existing room. */
routerRooms["delete"]("/room/:idroom", function (req, res) {
    res.send("Room deleted");
});
/** Users */
/* GET users listing. */
routerRooms.get('/users', function (req, res) {
    res.send('Users');
});
/* GET user */
routerRooms.get("/users/:iduser", function (req, res) {
    res.send("User get");
});
