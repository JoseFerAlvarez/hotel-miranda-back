import rooms from "../db/rooms.json";

const room_list = (req, res) => {
    res.send(rooms);
}

const room_detail = (req, res) => {
    res.send(rooms.find(room => Number(room.id) === Number(req.params.idroom)));
}

const room_post = (req, res) => {
    res.send("New room posted");
}

const room_put = (req, res) => {
    res.send("Room put");
}

const room_delete = (req, res) => {
    res.send("Room delete");
}

export {
    room_list,
    room_detail,
    room_post,
    room_put,
    room_delete
}
