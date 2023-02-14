"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../api/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = require("../api/db/connection");
const schemas_1 = require("../api/Schemas/schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const token = jsonwebtoken_1.default.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);
const id = "888888888888888888888888";
const user = {
    _id: new mongoose_1.default.mongo.ObjectId("888888888888888888888888"),
    name: 'Mr. JoseFer',
    photo: 'https://loremflickr.com/1920/1080/face',
    position: 'Manager',
    email: 'Berniece73@yahoo.com',
    phone: '+34 691 45 44 23',
    date: "2021-05-05T08:03:42.185Z",
    description: 'North closely male Kroon auxiliary Cadillac hertz JBOD deposit invoice Chief Creative Dysprosium radian architectures pariatur Iodine after enormously Technician Gardens marionberry Wagon Internal Liaison Accountability Intersex Folk invoice Money',
    status: 1,
    pass: '$2b$10$HE8UIA9S.HwVI1kLZWTfkOFNLZPhdEMMAikeqhOH0P20cBbJ.GJ82'
};
const room = {
    _id: new mongoose_1.default.mongo.ObjectId("888888888888888888888888"),
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
    _id: new mongoose_1.default.mongo.ObjectId("888888888888888888888888"),
    user_id: new mongoose_1.default.mongo.ObjectId("888888888888888888888888"),
    room_id: new mongoose_1.default.mongo.ObjectId("888888888888888888888888"),
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
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)(process.env.MONGO_LOCAL_CONNECTION);
    yield schemas_1.User.create(user);
    yield schemas_1.Room.create(room);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)(process.env.MONGO_LOCAL_CONNECTION);
    yield schemas_1.User.findOneAndDelete({ "_id": id }).exec();
    yield schemas_1.Room.findOneAndDelete({ "_id": id }).exec();
    yield (0, connection_1.disconnect)();
    yield index_1.default.close();
}));
describe("Get booking list", () => {
    test("Get bookings without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get("/bookings")
            .expect(401);
    }));
    test("Get bookings with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const bookings = yield schemas_1.Booking.find().exec();
        const bookingsDbIds = bookings.map((booking) => {
            return booking._id.toString();
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/bookings")
            .set("Authorization", "Bearer " + token);
        const bookingsRequestIds = res.body.map((booking) => {
            return booking._id.toString();
        });
        expect(bookingsRequestIds).toEqual(bookingsDbIds);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Post booking", () => {
    test("Post booking without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .post("/bookings")
            .expect(401);
    }));
    test("Post booking with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/bookings")
            .set("Authorization", "Bearer " + token)
            .send({
            booking: booking
        })
            .expect(200);
        expect(res.body.newbooking._id).toEqual(id);
    }));
});
describe("Get booking details", () => {
    test("Get booking details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get(`/bookings/${id}`)
            .expect(401);
    }));
    test("Get booking details with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get(`/bookings/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body._id).toEqual(id);
    }));
});
describe("Put booking", () => {
    test("Put booking without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .put(`/bookings/${id}`)
            .send({
            room: room
        })
            .expect(401);
    }));
    test("Put booking with token", () => __awaiter(void 0, void 0, void 0, function* () {
        booking.status = 1;
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/bookings/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
            booking: booking
        });
        expect(res.body.oldbooking.status).not.toEqual(res.body.newbooking.status);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Booking delete", () => {
    test("Delete booking without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .delete(`/bookings/${id}`)
            .expect(401);
    }));
    test("Delete booking with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/bookings/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body.oldbooking._id).toEqual(id);
    }));
});
//# sourceMappingURL=bookings.test.js.map