import { connect, disconnect } from "../db/connection";
import { Room } from "../Schemas/schroom";
import { IntRoom } from "../interfaces/interfaces";

const roomList = async (req, res, next) => {
    await connect();

    const rooms: IntRoom[] = await Room
        .find()
        .exec()
        .catch((e) => next(e));

    res.json(rooms);

    await disconnect();
};

const roomDetail = async (req, res, next) => {
    await connect();

    const room: IntRoom = await Room
        .findOne({ "_id": req.params.idroom })
        .exec()
        .catch((e) => next(e));

    res.json(room);

    await disconnect();
};

const roomPost = async (req, res, next) => {
    await connect();

    const room: IntRoom = await Room.create(req.body.room)
        .then((room) => room)
        .catch((e) => next(e));

    res.json({
        message: "New room posted",
        newroom: room
    });

    await disconnect();
}

const roomPut = async (req, res, next) => {
    await connect();

    const room: IntRoom = await Room
        .findOneAndUpdate({ "_id": req.params.idroom }, req.body.room)
        .exec()
        .catch((e) => next(e));

    res.json({
        message: "Room put",
        oldroom: room,
        newroom: req.body.room
    });

    await disconnect();
}

const roomDelete = async (req, res, next) => {
    await connect();
    const room: IntRoom = await Room
        .findOneAndDelete({ "_id": req.params.idroom })
        .exec()
        .catch((e) => next(e));

    res.json({
        message: "Room deleted",
        oldroom: room
    });

    await disconnect();
}

export {
    roomList,
    roomDetail,
    roomPost,
    roomPut,
    roomDelete
}
