import request from "supertest";
import server from "../index";
import jwt from "jsonwebtoken";
import { connect, disconnect } from "../db/connection";
import { User } from "../Schemas/schemas";
import mongoose from "mongoose";

const token: string = jwt.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);

const id = "888888888888888888888888";
const user = {
    _id: new mongoose.mongo.ObjectId("888888888888888888888888"),
    name: 'Mr. JoseFer',
    photo: 'https://loremflickr.com/1920/1080/face',
    position: 'Manager',
    email: 'Berniece73@yahoo.com',
    phone: '+34 691 45 44 23',
    date: "2021-05-05T08:03:42.185Z",
    description: 'North closely male Kroon auxiliary Cadillac hertz JBOD deposit invoice Chief Creative Dysprosium radian architectures pariatur Iodine after enormously Technician Gardens marionberry Wagon Internal Liaison Accountability Intersex Folk invoice Money',
    status: 1,
    pass: '$2b$10$HE8UIA9S.HwVI1kLZWTfkOFNLZPhdEMMAikeqhOH0P20cBbJ.GJ82'
}


beforeAll(async () => {
    await connect(process.env.MONGO_LOCAL_CONNECTION);
});

afterAll(async () => {
    await disconnect();
    await server.close();
});

describe("Get users list", (): void => {
    test("Get users without token", async (): Promise<void> => {
        await request(server)
            .get("/users")
            .expect(401);
    })

    test("Get users with token", async (): Promise<void> => {
        const users = await User.find().exec();
        const usersDbIds = users.map((user) => {
            return user._id.toString();
        });

        const res = await request(server)
            .get("/users")
            .set("Authorization", "Bearer " + token);

        const usersRequestIds = res.body.map((user) => {
            return user._id.toString();
        });

        expect(usersRequestIds).toEqual(usersDbIds);
        expect(res.statusCode).toBe(200);
    })
});

describe("User post", (): void => {
    test("User post without token", async (): Promise<void> => {
        await request(server)
            .post("/users")
            .expect(401);
    });

    test("User post with token", async (): Promise<void> => {
        const res = await request(server)
            .post("/users")
            .set("Authorization", "Bearer " + token)
            .send({
                user: user
            })
            .expect(200);

        expect(res.body.newuser._id).toEqual(id);
    })
});

describe("Get user details", (): void => {
    test("Get user details without token", async (): Promise<void> => {
        await request(server)
            .get(`/users/${id}`)
            .expect(401);
    });

    test("Get user details with token", async (): Promise<void> => {
        const res = await request(server)
            .get(`/users/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body._id).toEqual(id);
    })
});

describe("Put user", (): void => {
    test("Put user without token", async (): Promise<void> => {
        await request(server)
            .put(`/users/${id}`)
            .send({
                user: user
            })
            .expect(401);
    });

    test("Put user with token", async (): Promise<void> => {
        user.name = "Mr. Odin";

        const res = await request(server)
            .put(`/users/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
                user: user
            });

        expect(res.body.olduser.name).not.toEqual(res.body.newuser.name);
        expect(res.statusCode).toBe(200);
    })
});

describe("User delete", (): void => {
    test("Delete user without token", async (): Promise<void> => {
        await request(server)
            .delete(`/users/${id}`)
            .expect(401);
    });

    test("Delete user with token", async (): Promise<void> => {
        const res = await request(server)
            .delete(`/users/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body.olduser._id).toEqual(id);
    })
});
