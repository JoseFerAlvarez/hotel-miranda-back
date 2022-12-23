import contacts from "../db/guest.json";

const contactList = (req, res) => {
    res.json(contacts);
}

const contactDetail = (req, res) => {
    res.json(contacts.find((contact) => Number(contact.id) === Number(req.params.idcontact)));
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
