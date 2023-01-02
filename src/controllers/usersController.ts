const userList = (req, res) => {
    res.json({});
}

const userDetail = (req, res) => {
    res.json({});
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
