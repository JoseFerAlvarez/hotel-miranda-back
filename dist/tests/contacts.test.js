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
const contact = {
    _id: new mongoose_1.default.mongo.ObjectId("888888888888888888888888"),
    date: "2020-09-08T06:25:19.082Z",
    customer: 'Manolo Manolez',
    email: 'Kane.Medhurst21@gmail.com',
    phone: '+34 687 92 85 91',
    header: 'Aperiam quae consequatur voluptatum nostrum iusto est nam.',
    comment: 'Accusantium voluptatibus dolorem eligendi.',
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connect)(process.env.MONGO_LOCAL_CONNECTION);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.disconnect)();
    yield index_1.default.close();
}));
describe("Get contact list", () => {
    test("Get contacts without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get("/contacts")
            .expect(401);
    }));
    test("Get contacts with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const contacts = yield schemas_1.Contact.find().exec();
        const contactsDbIds = contacts.map((contact) => {
            return contact._id.toString();
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/contacts")
            .set("Authorization", "Bearer " + token);
        const contactsRequestIds = res.body.map((contact) => {
            return contact._id.toString();
        });
        expect(contactsRequestIds).toEqual(contactsDbIds);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Post contact", () => {
    test("Post contact without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .post("/contacts")
            .expect(401);
    }));
    test("Post contact with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/contacts")
            .set("Authorization", "Bearer " + token)
            .send({
            contact: contact
        })
            .expect(200);
        expect(res.body.newcontact._id).toEqual(id);
    }));
});
describe("Get contact details", () => {
    test("Get contact details without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .get(`/contacts/${id}`)
            .expect(401);
    }));
    test("Get contact details with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get(`/contacts/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body._id).toEqual(id);
    }));
});
describe("Put contact", () => {
    test("Put contact without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .put(`/contacts/${id}`)
            .send({
            contact: contact
        })
            .expect(401);
    }));
    test("Put contact with token", () => __awaiter(void 0, void 0, void 0, function* () {
        contact.customer = "Fernando Fernandez";
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/contacts/${id}`)
            .set("Authorization", "Bearer " + token)
            .send({
            contact: contact
        });
        expect(res.body.oldcontact.customer).not.toEqual(res.body.newcontact.customer);
        expect(res.statusCode).toBe(200);
    }));
});
describe("Delete contact", () => {
    test("Delete contact without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default)
            .delete(`/contacts/${id}`)
            .expect(401);
    }));
    test("Delete contact with token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .delete(`/contacts/${id}`)
            .set("Authorization", "Bearer " + token)
            .expect(200);
        expect(res.body.oldcontact._id).toEqual(id);
    }));
});
//# sourceMappingURL=contacts.test.js.map