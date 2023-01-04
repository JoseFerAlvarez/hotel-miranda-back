import { connect, disconnect } from "../db/connection";
import { User } from "../Schemas/schuser";
import { IntUser } from "../interfaces/interfaces";

const userList = async (req, res, next) => {
    await connect();

    const users: IntUser[] = await User
        .find()
        .exec()
        .catch((e: Error) => next(e));

    res.json(users);

    await disconnect();
}

const userDetail = async (req, res, next) => {
    await connect();

    const user: IntUser = await User
        .findOne({ "_id": req.params.iduser })
        .exec()
        .catch((e: Error) => next(e));

    res.json(user);

    await disconnect();
}

const userPost = async (req, res, next) => {
    await connect();

    await User
        .create(req.body.user)
        .catch((e: Error) => next(e));

    res.json({
        message: "New user posted",
        newuser: req.body.user
    });

    await disconnect();
}

const userPut = async (req, res, next) => {
    await connect();

    const user: IntUser = await User
        .findOneAndUpdate({ "_id": req.params.iduser }, req.body.user)
        .exec()
        .catch((e: Error) => next(e));

    res.json({
        message: "User put",
        olduser: user,
        newuser: req.body.user
    });

    await disconnect();
}

const userDelete = async (req, res, next) => {
    await connect();

    const user: IntUser = await User
        .findOneAndDelete({ "_id": req.params.iduser })
        .exec()
        .catch((e: Error) => next(e));

    res.json({
        message: "User deleted",
        olduser: user
    });

    await disconnect();
}

export {
    userList,
    userDetail,
    userPost,
    userPut,
    userDelete
}
