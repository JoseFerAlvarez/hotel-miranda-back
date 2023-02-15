import request from "supertest";
import server from "../index";
import jwt from "jsonwebtoken";
import { connect, disconnect } from "../db/connection";
import { Contact } from "../Schemas/schemas";
import mongoose from "mongoose";

const token: string = jwt.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);

const id = "888888888888888888888888";
const contact = {
    _id: new mongoose.mongo.ObjectId("888888888888888888888888"),
    date: "2020-09-08T06:25:19.082Z",
    customer: 'Manolo Manolez',
    email: 'Kane.Medhurst21@gmail.com',
    phone: '+34 687 92 85 91',
    header: 'Aperiam quae consequatur voluptatum nostrum iusto est nam.',
    comment: 'Accusantium voluptatibus dolorem eligendi.',
}

beforeAll(async () => {
    await connect(process.env.MONGO_LOCAL_CONNECTION);
});

afterAll(async () => {
    await disconnect();
    await server.close();
});

describe("Get contact list", (): void => {
    test("Get contacts without token", async (): Promise<void> => {
        await request(server)
            .get("/contacts")
            .expect(401);
    })

    test("Get contacts with token", async (): Promise<void> => {
        const contacts = await Contact.find().exec();
        const contactsDbIds = contacts.map((contact) => {
            return contact._id.toString();
        });

        const res = await request(server)
            .get("/contacts")
            .set("Authorization", "Bearer " + token);

        const contactsRequestIds = res.body.map((contact) => {
            return contact._id.toString();
        });

        expect(contactsRequestIds).toEqual(contactsDbIds);
        expect(res.statusCode).toBe(200);
    })
});

describe("Post contact", (): void => {
    test("Post contact without token", async (): Promise<void> => {
        await request(server)
            .post("/contacts")
            .expect(401);
    });

    test("Post contact with token", async (): Promise<void> => {
        const res = await request(server)
            .post("/contacts")
            .set("Authorization", "Bearer " + token)
            .send({
                contact: contact
            })
            .expect(200);

        expect(res.body.newcontact._id).toEqual(id);
    })
});

describe("Get contact details", (): void => {
    test("Get contact details without token", async (): Promise<void> => {
        await request(server)
            .get(`/contacts/${id}`)
            .expect(401);
    });

    test("Get contact details with token", async (): Promise<void> => {
        const res = await request(server)
            .get(`/contacts/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body._id).toEqual(id);
    })
});

describe("Put contact", (): void => {
    test("Put contact without token", async (): Promise<void> => {
        await request(server)
            .put(`/contacts/${id}`)
            .send({
                contact: contact
            })
            .expect(401);
    });

    test("Put contact with token", async (): Promise<void> => {
        contact.customer = "Fernando Fernandez";

        const res = await request(server)
            .put(`/contacts/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
                contact: contact
            });

        expect(res.body.oldcontact.customer).not.toEqual(res.body.newcontact.customer);
        expect(res.statusCode).toBe(200);
    })
});

describe("Delete contact", (): void => {
    test("Delete contact without token", async (): Promise<void> => {
        await request(server)
            .delete(`/contacts/${id}`)
            .expect(401);
    });

    test("Delete contact with token", async (): Promise<void> => {
        const res = await request(server)
            .delete(`/contacts/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body.oldcontact._id).toEqual(id);
    })
});
