import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";

import users from "../src/db/users.json";

const token = jwt.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");

describe("Get users list", () => {
    test("Get users without token", async () => {
        const res = await request(server).get("/users");
        expect(res.statusCode).toBe(401);
    })

    test("Get users with token", async () => {
        const res = await request(server)
            .get("/users")
            .set("Authorization", "Bearer " + token);

        expect(res.body).toEqual(users);
        expect(res.statusCode).toBe(200);
    })
});

describe("Get user details", () => {
    test("Get user details without token", async () => {
        const res = await request(server).get("/users/3");
        expect(res.statusCode).toBe(401);
    });

    test("Get user details with token", async () => {
        const res = await request(server)
            .get("/users/3")
            .set("Authorization", "Bearer " + token);

        const user = users.find(user => user.id === 3);

        expect(res.body).toEqual(user);
        expect(res.statusCode).toBe(200);
    })
});

describe("User post", () => {
    test("User post without token", async () => {
        const res = await request(server)
            .post("/users")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("User post with token", async () => {
        const res = await request(server)
            .get("/users")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Put user", () => {
    test("Put user without token", async () => {
        const res = await request(server)
            .put("/users/3")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Put user with token", async () => {
        const res = await request(server)
            .put("/users/3")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("User delete", () => {
    test("Delete user without token", async () => {
        const res = await request(server)
            .delete("/users/3");

        expect(res.statusCode).toBe(401);
    });

    test("Delete user with token", async () => {
        const res = await request(server)
            .delete("/users/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});
