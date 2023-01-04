import request from "supertest";
import server from "../src/index";
import jwt from "jsonwebtoken";
import { connect, disconnect } from "../src/db/connection";
import { Booking, User, Room } from "../src/Schemas/schemas";
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

const booking = {
    _id: new mongoose.mongo.ObjectId("888888888888888888888888"),
    user_id: new mongoose.mongo.ObjectId("888888888888888888888888"),
    room_id: new mongoose.mongo.ObjectId("888888888888888888888888"),
    name: 'Mr. JoseFer',
    order: "2022-05-01T18:44:48.408Z",
    checkin: "2022-11-21T04:27:30.639Z",
    checkout: "2022-11-26T17:21:16.594Z",
    type: 'Double Bed',
    numroom: 334,
    price: 64897,
    request: 'Nisi quos deserunt quibusdam debitis modi ipsa a.',
    amenities: ['Breakfast', 'Grocery'],
    photos: ['https://loremflickr.com/1920/1080/room'],
    description: 'Modi quod repellendus ',
    status: 2
}


beforeAll(async () => {
    await connect();

    await User.create(user);
    await Room.create(room);
});

afterAll(async () => {
    await connect();
    await User.findOneAndDelete({ "_id": id }).exec();
    await Room.findOneAndDelete({ "_id": id }).exec();

    await disconnect();
    await server.close();
});

describe("Get booking list", (): void => {
    test("Get bookings without token", async (): Promise<void> => {
        await request(server)
            .get("/bookings")
            .expect(401);
    })

    test("Get bookings with token", async (): Promise<void> => {
        const bookings = await Booking.find().exec();
        const bookingsDbIds = bookings.map((booking) => {
            return booking._id.toString();
        });

        const res = await request(server)
            .get("/bookings")
            .set("Authorization", "Bearer " + token);

        const bookingsRequestIds = res.body.map((booking) => {
            return booking._id.toString();
        });

        expect(bookingsRequestIds).toEqual(bookingsDbIds);
        expect(res.statusCode).toBe(200);
    })
});

describe("Post booking", (): void => {
    test("Post booking without token", async (): Promise<void> => {
        await request(server)
            .post("/bookings")
            .expect(401);
    });

    test("Post booking with token", async (): Promise<void> => {
        const res = await request(server)
            .post("/bookings")
            .set("Authorization", "Bearer " + token)
            .send({
                booking: booking
            })
            .expect(200);

        expect(res.body.newbooking._id).toEqual(id);
    })
});

describe("Get booking details", (): void => {
    test("Get booking details without token", async (): Promise<void> => {
        await request(server)
            .get(`/bookings/${id}`)
            .expect(401);
    });

    test("Get booking details with token", async (): Promise<void> => {
        const res = await request(server)
            .get(`/bookings/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body._id).toEqual(id);
    })
});



describe("Put booking", (): void => {
    test("Put booking without token", async (): Promise<void> => {
        await request(server)
            .put(`/bookings/${id}`)
            .send({
                room: room
            })
            .expect(401);
    });

    test("Put booking with token", async (): Promise<void> => {
        booking.status = 1;

        const res = await request(server)
            .put(`/bookings/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
                booking: booking
            });

        expect(res.body.oldbooking.status).not.toEqual(res.body.newbooking.status);
        expect(res.statusCode).toBe(200);
    })
});

describe("Booking delete", (): void => {
    test("Delete booking without token", async (): Promise<void> => {
        await request(server)
            .delete(`/bookings/${id}`)
            .expect(401);
    });

    test("Delete booking with token", async (): Promise<void> => {
        const res = await request(server)
            .delete(`/bookings/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);

        expect(res.body.oldbooking._id).toEqual(id);
    })
});
