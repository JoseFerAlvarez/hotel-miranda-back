import { dbQuery } from "../db/connection";
import { IntContact } from "../interfaces/interfaces";

const contactList = (req, res, next): void => {
    dbQuery("SELECT * FROM contacts;", null)
        .then((contacts: IntContact[]): void => res.json(contacts))
        .catch((e: Error): void => next(e));
};

const contactDetail = (req, res, next): void => {
    dbQuery("SELECT * FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then((contact: IntContact): void => res.json(contact))
        .catch((e: Error): void => next(e));
}

const contactPost = (req, res, next): void => {
    dbQuery("INSERT INTO contacts SET ?", req.body.contact)
        .then((): void => {
            res.json({
                message: "Contact added to database",
                room: req.body.contact
            })
        })
        .catch((e: Error): void => next(e));
}

const contactPut = (req, res, next): void => {
    dbQuery("UPDATE contacts SET ? WHERE idcontact = ?;", [req.body.contact, req.params.idcontact])
        .then((): void => {
            res.json({
                message: "Contact updated",
                room: req.body.contact
            })
        })
        .catch((e: Error): void => next(e));
};

const contactDelete = (req, res, next): void => {
    dbQuery("DELETE FROM contacts WHERE idcontact = ?;", [req.params.idcontact])
        .then((): void => {
            res.json({
                message: "Contact deleted",
            })
        })
        .catch((e: Error): void => next(e));
};

export {
    contactList,
    contactDetail,
    contactPost,
    contactPut,
    contactDelete
}
