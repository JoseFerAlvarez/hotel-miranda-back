import request from "supertest";
import server from "../src/index";

import rooms from "../src/db/rooms.json";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MSwiZW1haWwiOiJqb3NlZmVyQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzE2MjgyMDV9.wlGew9BUg28kRArvtm6rul_PbzHp6ndjjxC2wJx6eLI";

describe("Login route test", () => {
    test("Correct login", async () => {
        const res = await request(server)
            .post("/login")
            .send({
                email: "josefer@gmail.com",
                password: "1234"
            });

        expect(res.statusCode).toBe(200);
    });

    test("Incorrect login", async () => {
        const res = await request(server)
            .post("/login");

        expect(res.statusCode).toBe(200);
    });
});

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

/* describe("Get room details", () => {

}); */
