import { dbQuery } from "../db/connection";

const roomList = (req, res) => {
    dbQuery("SELECT * FROM rooms;", null)
        .then((rooms) => res.json(rooms));
}

const roomDetail = (req, res) => {
    dbQuery("SELECT * FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then((room) => res.json(room));
}

const roomPost = (req, res) => {
    dbQuery("INSERT INTO rooms SET ?", req.body.room)
        .then(() => {
            res.json({
                message: "Room added to database",
                room: req.body.room
            })
        });
}

const roomPut = (req, res) => {
    dbQuery("UPDATE rooms SET ? WHERE idroom = ?;", [req.body.room, req.params.idroom])
        .then(() => {
            res.json({
                message: "Room updated",
                room: req.body.room
            })
        })
}

const roomDelete = (req, res) => {
    dbQuery("DELETE FROM rooms WHERE idroom = ?;", [req.params.idroom])
        .then(() => {
            res.json({
                message: "Room deleted",
            })
        })
}

export {
    roomList,
    roomDetail,
    roomPost,
    roomPut,
    roomDelete
}
