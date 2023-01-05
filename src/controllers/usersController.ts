import { dbQuery } from "../db/connection";
import { IntUser } from "../interfaces/interfaces";

const userList = (req, res, next): void => {
    dbQuery("SELECT * FROM users;", null)
        .then((users: IntUser[]): void => res.json(users))
        .catch((e: Error): void => next(e));
};

const userDetail = (req, res, next): void => {
    dbQuery("SELECT * FROM users WHERE iduser = ?;", [req.params.iduser])
        .then((user: IntUser): void => res.json(user))
        .catch((e: Error): void => next(e));
};

const userPost = (req, res, next): void => {
    dbQuery("INSERT INTO users SET ?", req.body.user)
        .then((): void => {
            res.json({
                message: "User added to database",
                room: req.body.user
            })
        })
        .catch((e: Error): void => next(e));
};

const userPut = (req, res, next): void => {
    dbQuery("UPDATE users SET ? WHERE iduser = ?;", [req.body.user, req.params.iduser])
        .then((): void => {
            res.json({
                message: "User updated",
                room: req.body.user
            })
        })
        .catch((e: Error): void => next(e));
};

const userDelete = (req, res, next): void => {
    dbQuery("DELETE FROM users WHERE iduser = ?;", [req.params.iduser])
        .then((): void => {
            res.json({
                message: "User deleted",
            })
        })
        .catch((e: Error): void => next(e));
};

export {
    userList,
    userDetail,
    userPost,
    userPut,
    userDelete
}
