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
const token = jsonwebtoken_1.default.sign({ user: { _id: 1, email: process.env.DEFAULT_USER } }, process.env.SECRET_TOKEN);
describe("Get contact list", () => {
    test("Get contacts without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/contacts");
        expect(res.statusCode).toBe(401);
    }));
    test("Get contacts with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/contacts")
            .set("Authorization", "Bearer " + token);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Get contact details", () => {
    test("Get contact details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/contacts/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Get contact details with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/contacts/3")
            .set("Authorization", "Bearer " + token);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Post contact", () => {
    test("Post contact without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/contacts")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("Post contact with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/contacts")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("Put contact", () => {
    test("Put contact without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/contacts/3")
            .send({});
        expect(res.statusCode).toBe(401);
    }));
    test("Put contact with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put("/contacts/3")
            .set("Authorization", "Bearer " + token)
            .send({});
        expect(res.statusCode).toBe(200);
    }));
});
describe("Delete contact", () => {
    test("Delete contact without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/contacts/3");
        expect(res.statusCode).toBe(401);
    }));
    test("Delete contact with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete("/contacts/3")
            .set("Authorization", "Bearer " + token);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=contacts.test.js.map