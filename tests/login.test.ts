import request from "supertest";
import server from "../src/index";

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
            .post("/login")
            .send({
                email: "pepito@gmail.com",
                password: "qwerty"
            });

        expect(res.statusCode).toBe(500);
    });
});
