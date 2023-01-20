import { connect, disconnect } from "../db/connection";
import { User } from "../Schemas/schuser";
import { IntUser } from "../interfaces/interfaces";
import { getHashPass } from "../helpers/helpers";

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
    const user: IntUser = {
        name: req.body.user.name,
        photo: req.body.user.photo,
        position: req.body.user.position,
        email: req.body.user.email,
        phone: req.body.user.phone,
        date: req.body.user.date,
        description: req.body.user.description,
        status: req.body.user.status,
        pass: await getHashPass(req.body.user.pass)
    };

    const newuser: IntUser = await User.create(user)
        .then((user) => user)
        .catch((e: Error) => next(e));

    res.json({
        message: "New user posted",
        newuser: newuser
    });

    await disconnect();
}

const userPut = async (req, res, next) => {
    await connect();

    const user: IntUser = await User
        .findOne({ "_id": req.params.iduser })
        .exec()
        .catch((e: Error) => next(e));

    const newuser = req.body.user;

    if (user.pass !== newuser.pass) {
        newuser.pass = await getHashPass(newuser.pass);
    }

    await User
        .findOneAndUpdate({ "_id": req.params.iduser }, newuser)
        .exec()
        .catch((e: Error) => next(e));

    res.json({
        message: "User put",
        olduser: user,
        newuser: newuser
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
