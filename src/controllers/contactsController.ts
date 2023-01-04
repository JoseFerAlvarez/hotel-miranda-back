import { connect, disconnect } from "../db/connection";
import { Contact } from "../Schemas/schcontact";
import { IntContact } from "../interfaces/interfaces";

const contactList = async (req, res, next) => {
    await connect();

    const contacts: IntContact = await Contact
        .find()
        .exec()
        .catch((e: Error) => next(e));

    res.json(contacts);

    await disconnect();
}

const contactDetail = async (req, res, next) => {
    await connect();

    const contact: IntContact = await Contact
        .findOne({ "_id": req.params.idcontact })
        .exec()
        .catch((e: Error) => next(e));

    res.json(contact);

    await disconnect();
}

const contactPost = async (req, res, next) => {
    await connect();

    await Contact
        .create(req.body.contact)
        .catch((e: Error) => next(e));

    res.json({
        message: "New contact posted",
        newcontact: req.body.contact
    });

    await disconnect();
}

const contactPut = async (req, res, next) => {
    await connect();

    const contact: IntContact = await Contact
        .findOneAndUpdate({ "_id": req.params.idcontact }, req.body.contact)
        .exec()
        .catch((e: Error) => next(e));

    res.json({
        message: "Contact put",
        oldcontact: contact,
        newcontact: req.body.contact
    });

    await disconnect();
}

const contactDelete = async (req, res, next) => {
    await connect();

    const contact: IntContact = await Contact
        .findOneAndDelete({ "_id": req.params.idcontact })
        .exec()
        .catch((e: Error) => next(e));

    res.json({
        message: "Contact deleted",
        oldcontact: contact
    });

    await disconnect();
}

export {
    contactList,
    contactDetail,
    contactPost,
    contactPut,
    contactDelete
}
