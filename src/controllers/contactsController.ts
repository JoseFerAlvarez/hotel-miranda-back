import contacts from "../db/guest.json";

const contact_list = (req, res) => {
    res.send(contacts);
}

const contact_detail = (req, res) => {
    res.send(contacts.find((contact) => Number(contact.id) === Number(req.params.idcontact)));
}

const contact_post = (req, res) => {
    res.send("New room posted");
}

const contact_put = (req, res) => {
    res.send("Room put");
}

const contact_delete = (req, res) => {
    res.send("Room delete");
}

export {
    contact_list,
    contact_detail,
    contact_post,
    contact_put,
    contact_delete
}
