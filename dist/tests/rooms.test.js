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
const rooms_json_1 = __importDefault(require("../src/db/rooms.json"));
const token = jsonwebtoken_1.default.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");
describe("Get room list", () => {
    test("Get rooms without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/rooms");
        expect(res.statusCode).toBe(401);
    }));
    test("Get rooms with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/rooms")
            .set("Authorization", "Bearer " + token);
        expect(res.body).toEqual(rooms_json_1.default);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Get room details", () => {
    test("Get room details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/rooms/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Get rooms with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/rooms/3")
            .set("Authorization", "Bearer " + token);
        const room = rooms_json_1.default.find(room => room.id === 3);
        expect(res.body).toEqual(room);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Room post", () => {
    test("Room post without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/rooms")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("Get rooms with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/rooms")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("Put room", () => {
    test("Put room without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/rooms/3")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("Put room with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/rooms/3")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("Room delete", () => {
    test("Delete room without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/rooms/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Delete room with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/rooms/3")
            .set("Authorization", "Bearer " + token);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=rooms.test.js.map