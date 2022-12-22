import express from "express";
import {
    room_delete,
    room_detail,
    room_list,
    room_post,
    room_put
} from "../controllers/roomsController";
const routerRooms = express.Router();

/* GET rooms listing. */
routerRooms.get("/rooms", room_list)

/* GET room */
routerRooms.get(("/rooms/:idroom"), room_detail);

/* POST a new room. */
routerRooms.post("/rooms", room_post);

/* PUT an existing room. */
routerRooms.put("/rooms/:idroom", room_put);

/* DELETE an existing room. */
routerRooms.delete("/rooms/:idroom", room_delete)

export { routerRooms };
