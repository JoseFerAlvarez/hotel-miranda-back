import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";

const token: string = jwt.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");

describe("Get room list", (): void => {
    test("Get rooms without token", async (): Promise<void> => {
        const res = await request(server).get("/rooms");
        expect(res.statusCode).toBe(401);
    })

    test("Get rooms with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/rooms")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("Get room details", (): void => {
    test("Get room details without token", async (): Promise<void> => {
        const res = await request(server).get("/rooms/3");
        expect(res.statusCode).toBe(401);
    });

    test("Get rooms with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/rooms/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("Room post", (): void => {
    test("Room post without token", async (): Promise<void> => {
        const res = await request(server)
            .post("/rooms")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Get rooms with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/rooms")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Put room", (): void => {
    test("Put room without token", async (): Promise<void> => {
        const res = await request(server)
            .put("/rooms/3")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Put room with token", async (): Promise<void> => {
        const res = await request(server)
            .put("/rooms/3")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Room delete", (): void => {
    test("Delete room without token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/rooms/3");

        expect(res.statusCode).toBe(401);
    });

    test("Delete room with token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/rooms/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});
