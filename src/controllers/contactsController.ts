import { dbQuery } from "../mysql/connection";

const contactList = (req, res) => {
    dbQuery("SELECT * FROM contacts;", null)
        .then((contacts) => res.json(contacts));
}

const contactDetail = (req, res) => {
    dbQuery("SELECT * FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then((contact) => res.json(contact));
}

const contactPost = (req, res) => {
    dbQuery("INSERT INTO contacts SET ?", req.body.contact)
        .then(() => {
            res.json({
                message: "Contact added to database",
                room: req.body.contact
            })
        });
}

const contactPut = (req, res) => {
    dbQuery("UPDATE contacts SET ? WHERE idcontact = ?;", [req.body.contact, req.params.idcontact])
        .then(() => {
            res.json({
                message: "Contact updated",
                room: req.body.contact
            })
        })
}

const contactDelete = (req, res) => {
    dbQuery("DELETE FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then(() => {
            res.json({
                message: "Contact deleted",
            })
        })
}

export {
    contactList,
    contactDetail,
    contactPost,
    contactPut,
    contactDelete
}
