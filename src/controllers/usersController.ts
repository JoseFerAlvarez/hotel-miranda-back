import { connect } from "../db/connection";
import { User } from "../Schemas/schuser";
import { IntUser } from "../interfaces/interfaces";

const userList = async (req, res, next) => {
    connect(null);

    const query = User.find();

    await query.exec((err: Error, users: IntUser[]) => {
        if (err) return next(err);
        res.json(users);
    });
}

const userDetail = async (req, res, next) => {
    connect(null);

    const query = User.findOne({ "_id": req.params.iduser });

    await query.exec((err: Error, user: IntUser) => {
        if (err) return next(err);
        res.json(user);
    });
}

const userPost = async (req, res) => {
    connect(null);

    await User.create(req.body.user);

    res.json({
        message: "New user posted",
        newuser: req.body.user
    });
}

const userPut = async (req, res, next) => {
    connect(null);

    const query = User.findOneAndUpdate({ "_id": req.params.iduser }, req.body.user);

    await query.exec((err: Error, user: IntUser) => {
        if (err) return next(err);

        res.json({
            message: "User put",
            olduser: user,
            newuser: req.body.user
        });
    });
}

const userDelete = async (req, res, next) => {
    const query = User.findOneAndDelete({ "_id": req.params.iduser });

    await query.exec((err: Error, user: IntUser) => {
        if (err) return next(err);

        res.json({
            message: "User deleted",
            olduser: user
        });
    })
}

export {
    userList,
    userDetail,
    userPost,
    userPut,
    userDelete
}
