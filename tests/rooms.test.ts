import request from "supertest";
import server from "../index";
import jwt from "jsonwebtoken";
import { connect, disconnect } from "../db/connection";
import { Room } from "../Schemas/schemas";
import mongoose from "mongoose";

const token: string = jwt.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);

const id = "888888888888888888888888";
const room = {
    _id: new mongoose.mongo.ObjectId("888888888888888888888888"),
    numroom: 334,
    photos: ['https://loremflickr.com/1920/1080/room'],
    type: 'Double Bed',
    amenities: ['Breakfast', 'Grocery'],
    price: 64897,
    offer: 4,
    status: 0,
    cancellation: 'Ea quibusdam doloremque accusamus eum eos praesentium'
};

beforeAll(async () => {
    await connect(process.env.MONGO_LOCAL_CONNECTION);
});

afterAll(async () => {
    await disconnect();
    await server.close();
});

describe("Get room list", (): void => {
    test("Get rooms without token", async (): Promise<void> => {
        await request(server)
            .get("/rooms")
            .expect(401);
    })

    test("Get rooms with token", async (): Promise<void> => {
        const rooms = await Room.find().exec();
        const roomDbIds = rooms.map((room) => {
            return room._id.toString();
        });

        const res = await request(server)
            .get("/rooms")
            .set("Authorization", "Bearer " + token);

        const roomRequestIds = res.body.map((room) => {
            return room._id.toString();
        });

        expect(roomRequestIds).toEqual(roomDbIds);
        expect(res.statusCode).toBe(200);
    })
});

describe("Room post", (): void => {
    test("Room post without token", async (): Promise<void> => {
        await request(server)
            .post("/rooms")
            .expect(401);
    });

    test("Room post with token", async (): Promise<void> => {
        const res = await request(server)
            .post("/rooms")
            .set("Authorization", "Bearer " + token)
            .send({
                room: room
            })
            .expect(200);

        expect(res.body.newroom._id).toEqual(id);
    })
});


describe("Get room details", (): void => {
    test("Get room details without token", async (): Promise<void> => {
        await request(server)
            .get(`/rooms/${id}`)
            .expect(401);
    });

    test("Get room details with token", async (): Promise<void> => {
        const res = await request(server)
            .get(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body._id).toEqual(id);
    })
});

describe("Put room", (): void => {
    test("Put room without token", async (): Promise<void> => {
        await request(server)
            .put(`/rooms/${id}`)
            .send({
                room: room
            })
            .expect(401);
    });

    test("Put room with token", async (): Promise<void> => {
        room.type = "Testing type";

        const res = await request(server)
            .put(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
                room: room
            });

        expect(res.body.oldroom.type).not.toEqual(res.body.newroom.type);
        expect(res.statusCode).toBe(200);
    })
});

describe("Room delete", (): void => {
    test("Delete room without token", async (): Promise<void> => {
        await request(server)
            .delete(`/rooms/${id}`)
            .expect(401);
    });

    test("Delete room with token", async (): Promise<void> => {
        const res = await request(server)
            .delete(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body.oldroom._id).toEqual(id);
    })
});
