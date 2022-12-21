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
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MSwiZW1haWwiOiJqb3NlZmVyQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NzE2MjgyMDV9.wlGew9BUg28kRArvtm6rul_PbzHp6ndjjxC2wJx6eLI";
describe("Login test", () => {
    test("Correct login", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/login")
            .send({
            email: "josefer@gmail.com",
            password: "1234"
        });
        expect(res.statusCode).toBe(200);
    }));
});
describe("Get room", () => {
    test("Get rooms", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/rooms");
        expect(res.statusCode).toBe(401);
    }));
    test("Get rooms true", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/rooms")
            .set("Authorization", "Bearer " + token);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=routes.test.js.map