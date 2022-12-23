import users from "../db/users.json";
import { User } from "src/interfaces/interfaces";

const userList = (req, res) => {
    res.json(users);
}

const userDetail = (req, res) => {
    res.json(users.find((user: User) => Number(user.id) === Number(req.params.iduser)));
}

const userPost = (req, res) => {
    res.json({
        message: "New user posted"
    });
}

const userPut = (req, res) => {
    res.json({
        message: "User put"
    });
}

const userDelete = (req, res) => {
    res.json({
        message: "User delete"
    });
}

export {
    userList,
    userDetail,
    userPost,
    userPut,
    userDelete
}
