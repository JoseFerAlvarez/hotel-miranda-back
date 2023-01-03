import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";

const token: string = jwt.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);

describe("Get contact list", (): void => {
    test("Get contacts without token", async (): Promise<void> => {
        const res = await request(server).get("/contacts");
        expect(res.statusCode).toBe(401);
    })

    test("Get contacts with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/contacts")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("Get contact details", (): void => {
    test("Get contact details without token", async (): Promise<void> => {
        const res = await request(server).get("/contacts/3");
        expect(res.statusCode).toBe(401);
    });

    test("Get contact details with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/contacts/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("Post contact", (): void => {
    test("Post contact without token", async (): Promise<void> => {
        const res = await request(server)
            .post("/contacts")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Post contact with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/contacts")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Put contact", (): void => {
    test("Put contact without token", async (): Promise<void> => {
        const res = await request(server)
            .put("/contacts/3")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Put contact with token", async (): Promise<void> => {
        const res = await request(server)
            .put("/contacts/3")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Delete contact", (): void => {
    test("Delete contact without token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/contacts/3");

        expect(res.statusCode).toBe(401);
    });

    test("Delete contact with token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/contacts/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});
