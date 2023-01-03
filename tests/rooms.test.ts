import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";
import { connect, disconnect } from "../src/db/connection";
import { Room } from "../src/Schemas/schemas";
import mongoose from "mongoose";

const token: string = jwt.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);

const idRoom = "888888888888888888888888";
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
    await connect(null);
});

afterAll(async () => {
    await disconnect();
});

describe("Get room list", (): void => {
    test("Get rooms without token", async (): Promise<void> => {
        await request(server)
            .get("/rooms")
            .expect(401);
    });

    test("Get rooms with token", async (): Promise<void> => {
        const res = await request(server)
            .get("/rooms")
            .set("Authorization", "Bearer " + token);

        const rooms = await Room.find();

        const roomDbIds = rooms.map((room) => {
            return room._id.toString();
        });
        const roomRequestIds = rooms.map((room) => {
            return room._id.toString();
        });


        expect(roomRequestIds).toEqual(roomDbIds);
        expect(res.statusCode).toBe(200);
    })
});


/* describe("Get room details", (): void => {
    const id = "63b3f69d8622c23daeb2bbeb";
    test("Get room details without token", async (): Promise<void> => {
        const res = await request(server).get(`/rooms/${id}`);
        expect(res.statusCode).toBe(401);
    });

    test("Get rooms with token", async (): Promise<void> => {
        const res = await request(server)
            .get(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token);

        const idRequest = res.body._id.toString();

        expect(idRequest).toEqual(id);
        expect(res.statusCode).toBe(200);
    })
}); */

/* describe("Room post", (): void => {
    test("Room post without token", async (): Promise<void> => {
        await request(server)
            .post("/rooms")
            .expect(401);
    });

    test("Room post with token", async (): Promise<void> => {
        await request(server)
            .post("/rooms")
            .set("Authorization", "Bearer " + token)
            .expect(200);
    })
}); */

/*describe("Put room", (): void => {
    const id = "63b3f69d8622c23daeb2bbeb";
    const room = {
        numroom: 334,
        photos: ['https://loremflickr.com/1920/1080/room'],
        type: 'Double Bed',
        amenities: ['Breakfast', 'Grocery', 'Single bed'],
        price: 64897,
        offer: 4,
        status: 0,
        cancellation: 'Ea quibusdam doloremque'
    }

    test("Put room without token", async (): Promise<void> => {
        const res = await request(server)
            .put(`/rooms/${id}`)
            .send({
                room: room
            });

        expect(res.statusCode).toBe(401);
    });

    test("Put room with token", async (): Promise<void> => {
        const res = await request(server)
            .put(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
                room: room
            });

        expect(res.body).toEqual("");
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
});*/
