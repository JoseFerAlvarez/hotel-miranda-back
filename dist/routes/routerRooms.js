"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRooms = void 0;
const express_1 = __importDefault(require("express"));
const routerRooms = express_1.default.Router();
exports.routerRooms = routerRooms;
/** Rooms */
/* GET rooms listing. */
routerRooms.get("/rooms", (req, res) => {
    res.send("Rooms get");
});
/* GET room */
routerRooms.get(("/rooms/:idroom"), (req, res) => {
    res.send("Room get");
});
/* POST a new room. */
routerRooms.post("/rooms", (req, res) => {
    res.send("Room post");
});
/* PUT an existing room. */
routerRooms.put("/room/:idroom", (req, res) => {
    res.send("Room put");
});
/* DELETE an existing room. */
routerRooms.delete("/room/:idroom", (req, res) => {
    res.send("Room deleted");
});
//# sourceMappingURL=routerRooms.js.map