import express from "express";
import {
    roomDelete,
    roomDetail,
    roomList,
    roomPost,
    roomPut
} from "../controllers/roomsController";

const routerRooms = express.Router();

/* GET rooms listing. */
routerRooms.get('/', roomList)

/* GET room */
routerRooms.get(('/:idroom'), roomDetail);

/* POST a new room. */
routerRooms.post('/', roomPost);

/* PUT an existing room. */
routerRooms.put('/:idroom', roomPut);

/* DELETE an existing room. */
routerRooms.delete('/:idroom', roomDelete)

export default routerRooms;
