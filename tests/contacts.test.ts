import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";

import contacts from "../src/db/guest.json";

const token = jwt.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");

describe("Get contact list", () => {
    test("Get contacts without token", async () => {
        const res = await request(server).get("/contacts");
        expect(res.statusCode).toBe(401);
    })

    test("Get contacts with token", async () => {
        const res = await request(server)
            .get("/contacts")
            .set("Authorization", "Bearer " + token);

        expect(res.body).toEqual(contacts);
        expect(res.statusCode).toBe(200);
    })
});

describe("Get contact details", () => {
    test("Get contact details without token", async () => {
        const res = await request(server).get("/contacts/3");
        expect(res.statusCode).toBe(401);
    });

    test("Get contact details with token", async () => {
        const res = await request(server)
            .get("/contacts/3")
            .set("Authorization", "Bearer " + token);

        const contact = contacts.find(contact => contact.id === 3);

        expect(res.body).toEqual(contact);
        expect(res.statusCode).toBe(200);
    })
});

describe("Post contact", () => {
    test("Post contact without token", async () => {
        const res = await request(server)
            .post("/contacts")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Post contact with token", async () => {
        const res = await request(server)
            .get("/contacts")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Put contact", () => {
    test("Put contact without token", async () => {
        const res = await request(server)
            .put("/contacts/3")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Put contact with token", async () => {
        const res = await request(server)
            .put("/contacts/3")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Delete contact", () => {
    test("Delete contact without token", async () => {
        const res = await request(server)
            .delete("/contacts/3");

        expect(res.statusCode).toBe(401);
    });

    test("Delete contact with token", async () => {
        const res = await request(server)
            .delete("/contacts/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});
