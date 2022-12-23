"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomsController_1 = require("../controllers/roomsController");
const routerRooms = express_1.default.Router();
/* GET rooms listing. */
routerRooms.get('/', roomsController_1.roomList);
/* GET room */
routerRooms.get(('/:idroom'), roomsController_1.roomDetail);
/* POST a new room. */
routerRooms.post('/', roomsController_1.roomPost);
/* PUT an existing room. */
routerRooms.put('/:idroom', roomsController_1.roomPut);
/* DELETE an existing room. */
routerRooms.delete('/:idroom', roomsController_1.roomDelete);
exports.default = routerRooms;
//# sourceMappingURL=routesRooms.js.map