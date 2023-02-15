import request from "supertest";
import server from "../index";

describe("Login route test", (): void => {
    test("Correct login", async (): Promise<void> => {
        const res = await request(server)
            .post("/login")
            .send({
                email: "josefer@gmail.com",
                password: "1234"
            });

        expect(res.statusCode).toBe(200);
    });

    test("Incorrect login", async (): Promise<void> => {
        const res = await request(server)
            .post("/login")
            .send({
                email: "pepito@gmail.com",
                password: "qwerty"
            });

        expect(res.statusCode).toBe(500);
    });
});
