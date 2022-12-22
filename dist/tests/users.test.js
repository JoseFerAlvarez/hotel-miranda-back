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
const users_json_1 = __importDefault(require("../src/db/users.json"));
const token = jsonwebtoken_1.default.sign({ user: { _id: 1, email: "josefer@gmail.com" } }, "TOP_SECRET");
describe("Get users list", () => {
    test("Get users without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/users");
        expect(res.statusCode).toBe(401);
    }));
    test("Get users with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/users")
            .set("Authorization", "Bearer " + token);
        expect(res.body).toEqual(users_json_1.default);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Get user details", () => {
    test("Get user details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/users/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Get user details with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/users/3")
            .set("Authorization", "Bearer " + token);
        const user = users_json_1.default.find((user) => user.id === 3);
        expect(res.body).toEqual(user);
        expect(res.statusCode).toBe(200);
    }));
});
describe("User post", () => {
    test("User post without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("User post with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/users")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("Put user", () => {
    test("Put user without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/users/3")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("Put user with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/users/3")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("User delete", () => {
    test("Delete user without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/users/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Delete user with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/users/3")
            .set("Authorization", "Bearer " + token);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=users.test.js.map