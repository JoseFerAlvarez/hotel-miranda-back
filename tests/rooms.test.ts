import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";

import rooms from "../src/db/rooms.json";

const token = jwt.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");

describe("Get room list", () => {
    test("Get rooms without token", async () => {
        const res = await request(server).get("/rooms");
        expect(res.statusCode).toBe(401);
    })

    test("Get rooms with token", async () => {
        const res = await request(server)
            .get("/rooms")
            .set("Authorization", "Bearer " + token);

        expect(res.body).toEqual(rooms);
        expect(res.statusCode).toBe(200);
    })
});

describe("Get room details", () => {
    test("Get room details without token", async () => {
        const res = await request(server).get("/rooms/3");
        expect(res.statusCode).toBe(401);
    });

    test("Get rooms with token", async () => {
        const res = await request(server)
            .get("/rooms/3")
            .set("Authorization", "Bearer " + token);

        const room = rooms.find(room => room.id === 3);

        expect(res.body).toEqual(room);
        expect(res.statusCode).toBe(200);
    })
});

describe("Room post", () => {
    test("Room post without token", async () => {
        const res = await request(server)
            .post("/rooms")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Get rooms with token", async () => {
        const res = await request(server)
            .get("/rooms")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Put room", () => {
    test("Put room without token", async () => {
        const res = await request(server)
            .put("/rooms/3")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Put room with token", async () => {
        const res = await request(server)
            .put("/rooms/3")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Room delete", () => {
    test("Delete room without token", async () => {
        const res = await request(server)
            .delete("/rooms/3");

        expect(res.statusCode).toBe(401);
    });

    test("Delete room with token", async () => {
        const res = await request(server)
            .delete("/rooms/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});
