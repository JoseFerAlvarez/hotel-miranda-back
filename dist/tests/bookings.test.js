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
const index_1 = __importDefault(require("../src/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const guest_json_1 = __importDefault(require("../src/db/guest.json"));
const token = jsonwebtoken_1.default.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");
describe("Get booking list", () => {
    test("Get bookings without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/bookings");
        expect(res.statusCode).toBe(401);
    }));
    test("Get bookings with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/bookings")
            .set("Authorization", "Bearer " + token);
        expect(res.body).toEqual(guest_json_1.default);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Get booking details", () => {
    test("Get booking details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/bookings/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Get booking details with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/bookings/3")
            .set("Authorization", "Bearer " + token);
        const booking = guest_json_1.default.find((booking) => booking.id === 3);
        expect(res.body).toEqual(booking);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Post booking", () => {
    test("Post booking without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/bookings")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("Post booking with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/bookings")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("Put booking", () => {
    test("Put booking without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/bookings/3")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("Put booking with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/bookings/3")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("Booking delete", () => {
    test("Delete booking without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/bookings/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Delete booking with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/bookings/3")
            .set("Authorization", "Bearer " + token);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=bookings.test.js.map