import users from "../db/users.json";
import { User } from "src/interfaces/User";

const user_list = (req, res) => {
    res.send(users);
}

const user_detail = (req, res) => {
    res.send(users.find((user: User) => Number(user.id) === Number(req.params.iduser)));
}

const user_post = (req, res) => {
    res.send("New user posted");
}

const user_put = (req, res) => {
    res.send("User put");
}

const user_delete = (req, res) => {
    res.send("User delete");
}

export {
    user_list,
    user_detail,
    user_post,
    user_put,
    user_delete
}
