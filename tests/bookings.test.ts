import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";

const token: string = jwt.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);

describe("Get booking list", (): void => {
    test("Get bookings without token", async (): Promise<void> => {
        const res = await request(server).get("/bookings");
        expect(res.statusCode).toBe(401);
    })

    test("Get bookings with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/bookings")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("Get booking details", (): void => {
    test("Get booking details without token", async (): Promise<void> => {
        const res = await request(server).get("/bookings/3");
        expect(res.statusCode).toBe(401);
    });

    test("Get booking details with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/bookings/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});

describe("Post booking", (): void => {
    test("Post booking without token", async (): Promise<void> => {
        const res = await request(server)
            .post("/bookings")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Post booking with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/bookings")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Put booking", (): void => {
    test("Put booking without token", async (): Promise<void> => {
        const res = await request(server)
            .put("/bookings/3")
            .send({});

        expect(res.statusCode).toBe(401);
    });

    test("Put booking with token", async (): Promise<void> => {
        const res = await request(server)
            .put("/bookings/3")
            .set("Authorization", "Bearer " + token)
            .send({});

        expect(res.statusCode).toBe(200);
    })
});

describe("Booking delete", (): void => {
    test("Delete booking without token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/bookings/3");

        expect(res.statusCode).toBe(401);
    });

    test("Delete booking with token", async (): Promise<void> => {
        const res = await request(server)
            .delete("/bookings/3")
            .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toBe(200);
    })
});
