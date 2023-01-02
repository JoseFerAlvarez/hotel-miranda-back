import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";

const token: string = jwt.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");

describe("Get users list", (): void => {
    test("Get users without token", async (): Promise<void> => {
        const res = await request(server).get("/users");
        expect(res.statusCode).toBe(401);
    })

    test("Get users with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/users")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("Get user details", (): void => {
    test("Get user details without token", async (): Promise<void> => {
        const res = await request(server).get("/users/3");
        expect(res.statusCode).toBe(401);
    });

    test("Get user details with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/users/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("User post", (): void => {
    test("User post without token", async (): Promise<void> => {
        const res = await request(server)
            .post("/users")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("User post with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/users")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Put user", (): void => {
    test("Put user without token", async (): Promise<void> => {
        const res = await request(server)
            .put("/users/3")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Put user with token", async (): Promise<void> => {
        const res = await request(server)
            .put("/users/3")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("User delete", (): void => {
    test("Delete user without token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/users/3");

        expect(res.statusCode).toBe(401);
    });

    test("Delete user with token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/users/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});
