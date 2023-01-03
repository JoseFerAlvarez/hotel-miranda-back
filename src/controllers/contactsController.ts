import { connect } from "../db/connection";
import { Contact } from "../Schemas/schcontact";

const contactList = async (req, res, next) => {
    connect(null);

    const query = Contact.find();

    await query.exec((err, contacts) => {
        if (err) return next(err);
        res.json(contacts);
    });
}

const contactDetail = async (req, res, next) => {
    connect(null);

    const query = Contact.findOne({ "_id": req.params.idcontact });

    await query.exec((err, contact) => {
        if (err) return next(err);
        res.json(contact)
    });
}

const contactPost = async (req, res) => {
    connect(null);

    await Contact.create(req.body.contact);

    res.json({
        message: "New contact posted",
        newcontact: req.body.contact
    });
}

const contactPut = async (req, res, next) => {
    connect(null);

    const query = Contact.findOneAndUpdate({ "_id": req.params.idcontact }, req.body.contact);

    await query.exec((err, contact) => {
        if (err) return next(err);

        res.json({
            message: "Contact put",
            oldcontact: contact,
            newcontact: req.body.contact
        });
    });
}

const contactDelete = async (req, res, next) => {
    const query = Contact.findOneAndDelete({ "_id": req.params.idcontact });

    await query.exec((err, contact) => {
        if (err) return next(err);

        res.json({
            message: "Contact deleted",
            oldcontact: contact
        });
    })
}

export {
    contactList,
    contactDetail,
    contactPost,
    contactPut,
    contactDelete
}
