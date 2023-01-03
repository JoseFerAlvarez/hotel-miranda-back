import { connect } from "../db/connection";
import { Room } from "../Schemas/schroom";

const roomList = async (req, res, next) => {
    connect(null);

    const query = Room.find();

    await query.exec((err, rooms) => {
        if (err) return next(err);
        res.json(rooms);
    });
}

const roomDetail = async (req, res, next) => {
    connect(null);

    const query = Room.findOne({ "_id": req.params.idroom });

    await query.exec((err, room) => {
        if (err) return next(err);
        res.json(room)
    });
}

const roomPost = async (req, res) => {
    connect(null);

    await Room.create(req.body.room);

    res.json({
        message: "New room posted",
        newroom: req.body.room
    });
}

const roomPut = async (req, res, next) => {
    connect(null);

    const query = Room.findOneAndUpdate({ "_id": req.params.idroom }, req.body.room);

    await query.exec((err, room) => {
        if (err) return next(err);

        res.json({
            message: "Room put",
            oldroom: room,
            newroom: req.body.room
        });
    });
}

const roomDelete = async (req, res, next) => {
    const query = Room.findOneAndDelete({ "_id": req.params.idroom });

    await query.exec((err, room) => {
        if (err) return next(err);

        res.json({
            message: "Room deleted",
            oldroom: room
        });
    })
}

export {
    roomList,
    roomDetail,
    roomPost,
    roomPut,
    roomDelete
}
