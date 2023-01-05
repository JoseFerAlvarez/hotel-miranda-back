import { dbQuery } from "../db/connection";
import { IntRoom } from "../interfaces/interfaces";

const roomList = (req, res, next): void => {
    dbQuery("SELECT * FROM rooms;", null)
        .then((rooms: IntRoom[]): void => res.json(rooms))
        .catch((e: Error): void => next(e));
};

const roomDetail = (req, res, next): void => {
    dbQuery("SELECT * FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then((room: IntRoom): void => res.json(room))
        .catch((e: Error): void => next(e));
};

const roomPost = (req, res, next): void => {
    dbQuery("INSERT INTO rooms SET ?", req.body.room)
        .then((): void => {
            res.json({
                message: "Room added to database",
                room: req.body.room
            })
        })
        .catch((e: Error): void => next(e));
};

const roomPut = (req, res, next): void => {
    dbQuery("UPDATE rooms SET ? WHERE idroom = ?;", [req.body.room, req.params.idroom])
        .then((): void => {
            res.json({
                message: "Room updated",
                room: req.body.room
            })
        })
        .catch((e: Error): void => next(e));
};

const roomDelete = (req, res, next): void => {
    dbQuery("DELETE FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then((): void => {
            res.json({
                message: "Room deleted",
            })
        })
        .catch((e: Error): void => next(e));
};

export {
    roomList,
    roomDetail,
    roomPost,
    roomPut,
    roomDelete
}
