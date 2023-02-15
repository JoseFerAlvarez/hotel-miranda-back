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
const index_1 = __importDefault(require("../index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = require("../db/connection");
const schemas_1 = require("../Schemas/schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const token = jsonwebtoken_1.default.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);
const id = "888888888888888888888888";
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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)(process.env.MONGO_LOCAL_CONNECTION);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.disconnect)();
    yield index_1.default.close();
}));
describe("Get room list", () => {
    test("Get rooms without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get("/rooms")
            .expect(401);
    }));
    test("Get rooms with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const rooms = yield schemas_1.Room.find().exec();
        const roomDbIds = rooms.map((room) => {
            return room._id.toString();
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/rooms")
            .set("Authorization", "Bearer " + token);
        const roomRequestIds = res.body.map((room) => {
            return room._id.toString();
        });
        expect(roomRequestIds).toEqual(roomDbIds);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Room post", () => {
    test("Room post without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .post("/rooms")
            .expect(401);
    }));
    test("Room post with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/rooms")
            .set("Authorization", "Bearer " + token)
            .send({
            room: room
        })
            .expect(200);
        expect(res.body.newroom._id).toEqual(id);
    }));
});
describe("Get room details", () => {
    test("Get room details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get(`/rooms/${id}`)
            .expect(401);
    }));
    test("Get room details with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body._id).toEqual(id);
    }));
});
describe("Put room", () => {
    test("Put room without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .put(`/rooms/${id}`)
            .send({
            room: room
        })
            .expect(401);
    }));
    test("Put room with token", () => __awaiter(void 0, void 0, void 0, function* () {
        room.type = "Testing type";
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
            room: room
        });
        expect(res.body.oldroom.type).not.toEqual(res.body.newroom.type);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Room delete", () => {
    test("Delete room without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .delete(`/rooms/${id}`)
            .expect(401);
    }));
    test("Delete room with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/rooms/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body.oldroom._id).toEqual(id);
    }));
});
//# sourceMappingURL=rooms.test.js.map