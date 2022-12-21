"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRooms = void 0;
const express_1 = __importDefault(require("express"));
const roomsController_1 = require("../controllers/roomsController");
const routerRooms = express_1.default.Router();
exports.routerRooms = routerRooms;
/* GET rooms listing. */
routerRooms.get("/rooms", roomsController_1.room_list);
/* GET room */
routerRooms.get(("/rooms/:idroom"), roomsController_1.room_detail);
/* POST a new room. */
routerRooms.post("/rooms", roomsController_1.room_post);
/* PUT an existing room. */
routerRooms.put("/room/:idroom", roomsController_1.room_put);
/* DELETE an existing room. */
routerRooms.delete("/room/:idroom", roomsController_1.room_delete);
//# sourceMappingURL=routesRooms.js.map