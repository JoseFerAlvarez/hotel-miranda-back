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
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)(process.env.MONGO_LOCAL_CONNECTION);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.disconnect)();
    yield index_1.default.close();
}));
describe("Get users list", () => {
    test("Get users without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get("/users")
            .expect(401);
    }));
    test("Get users with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield schemas_1.User.find().exec();
        const usersDbIds = users.map((user) => {
            return user._id.toString();
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/users")
            .set("Authorization", "Bearer " + token);
        const usersRequestIds = res.body.map((user) => {
            return user._id.toString();
        });
        expect(usersRequestIds).toEqual(usersDbIds);
        expect(res.statusCode).toBe(200);
    }));
});
describe("User post", () => {
    test("User post without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .expect(401);
    }));
    test("User post with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .set("Authorization", "Bearer " + token)
            .send({
            user: user
        })
            .expect(200);
        expect(res.body.newuser._id).toEqual(id);
    }));
});
describe("Get user details", () => {
    test("Get user details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get(`/users/${id}`)
            .expect(401);
    }));
    test("Get user details with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get(`/users/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body._id).toEqual(id);
    }));
});
describe("Put user", () => {
    test("Put user without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .put(`/users/${id}`)
            .send({
            user: user
        })
            .expect(401);
    }));
    test("Put user with token", () => __awaiter(void 0, void 0, void 0, function* () {
        user.name = "Mr. Odin";
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/users/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
            user: user
        });
        expect(res.body.olduser.name).not.toEqual(res.body.newuser.name);
        expect(res.statusCode).toBe(200);
    }));
});
describe("User delete", () => {
    test("Delete user without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .delete(`/users/${id}`)
            .expect(401);
    }));
    test("Delete user with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/users/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body.olduser._id).toEqual(id);
    }));
});
//# sourceMappingURL=users.test.js.map