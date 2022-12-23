import rooms from "../db/rooms.json";
import { Room } from "src/interfaces/interfaces";

const roomList = (req, res) => {
    res.json(rooms);
}

const roomDetail = (req, res) => {
    res.json(rooms.find((room: Room) => Number(room.id) === Number(req.params.idroom)));
}

const roomPost = (req, res) => {
    res.json({
        message: "New room posted"
    });
}

const roomPut = (req, res) => {
    res.json({
        message: "Room put"
    });
}

const roomDelete = (req, res) => {
    res.json({
        message: "Room delete"
    });
}

export {
    roomList,
    roomDetail,
    roomPost,
    roomPut,
    roomDelete
}
