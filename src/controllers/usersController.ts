import { dbQuery } from "../mysql/connection";

const userList = (req, res) => {
    dbQuery("SELECT * FROM users;", null)
        .then((users) => res.json(users));
}

const userDetail = (req, res) => {
    dbQuery("SELECT * FROM users WHERE iduser = ?;", [req.params.iduser])
        .then((user) => res.json(user));
}

const userPost = (req, res) => {
    dbQuery("INSERT INTO users SET ?", req.body.user)
        .then(() => {
            res.json({
                message: "User added to database",
                room: req.body.user
            })
        });
}

const userPut = (req, res) => {
    dbQuery("UPDATE users SET ? WHERE iduser = ?;", [req.body.user, req.params.iduser])
        .then(() => {
            res.json({
                message: "User updated",
                room: req.body.user
            })
        })
}

const userDelete = (req, res) => {
    dbQuery("DELETE FROM users WHERE iduser = ?;", [req.params.iduser])
        .then(() => {
            res.json({
                message: "User deleted",
            })
        })
}

export {
    userList,
    userDetail,
    userPost,
    userPut,
    userDelete
}
