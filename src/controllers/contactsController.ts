const contactList = (req, res) => {
    res.json({});
}

const contactDetail = (req, res) => {
    res.json({});
}

const contactPost = (req, res) => {
    res.json({
        message: "New room posted"
    });
}

const contactPut = (req, res) => {
    res.json({
        message: "Room put"
    });
}

const contactDelete = (req, res) => {
    res.json({
        message: "Room delete"
    });
}

export {
    contactList,
    contactDetail,
    contactPost,
    contactPut,
    contactDelete
}
