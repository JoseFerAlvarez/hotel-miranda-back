"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomsController_1 = require("../controllers/roomsController");
const routerRooms = express_1.default.Router();
routerRooms.get('/', roomsController_1.roomList);
routerRooms.get(('/:idroom'), roomsController_1.roomDetail);
routerRooms.post('/', roomsController_1.roomPost);
routerRooms.put('/:idroom', roomsController_1.roomPut);
routerRooms.delete('/:idroom', roomsController_1.roomDelete);
exports.default = routerRooms;
