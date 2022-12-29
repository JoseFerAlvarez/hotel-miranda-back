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
const connection_1 = require("./connection");
const connection_2 = __importDefault(require("./connection"));
const faker_1 = require("@faker-js/faker");
connection_2.default.connect();
Promise.all([createRoomsTable(), createUsersTable(), insertRooms(20), insertUsers(20)]).then(() => connection_2.default.end());
function createRoomsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)("CREATE OR REPLACE TABLE rooms ( idroom VARCHAR(255), number SMALLINT, photo VARCHAR(500), type VARCHAR(255), amenities VARCHAR(500), price INT, offer INT, status VARCHAR(5), PRIMARY KEY(idroom));", null);
    });
}
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)("CREATE OR REPLACE TABLE users (iduser VARCHAR(255), name VARCHAR(255), photo VARCHAR(500), position VARCHAR(255), email VARCHAR(255), phone VARCHAR(50), date VARCHAR(100), description VARCHAR(500), state VARCHAR(5), pass VARCHAR(255), PRIMARY KEY(iduser));", null);
    });
}
function insertRooms(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const room = setRandomRoom();
            yield (0, connection_1.dbQuery)("INSERT INTO rooms SET ?", room);
        }
    });
}
function insertUsers(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const user = setRandomUser();
            yield (0, connection_1.dbQuery)("INSERT INTO users SET ?", user);
        }
    });
}
function setRandomRoom() {
    return {
        idroom: faker_1.faker.datatype.uuid(),
        number: faker_1.faker.datatype.number({ max: 1000 }),
        photo: faker_1.faker.image.city(),
        type: faker_1.faker.random.words(3),
        amenities: String(faker_1.faker.random.words(10)),
        price: faker_1.faker.datatype.number({ max: 100000 }),
        offer: faker_1.faker.datatype.number({ max: 100 }),
        status: String(faker_1.faker.datatype.boolean())
    };
}
function setRandomUser() {
    return {
        iduser: faker_1.faker.datatype.uuid(),
        name: faker_1.faker.name.fullName(),
        photo: faker_1.faker.image.avatar(),
        position: faker_1.faker.commerce.department(),
        email: faker_1.faker.internet.email(),
        phone: faker_1.faker.phone.number(),
        date: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        description: faker_1.faker.random.words(30),
        state: String(faker_1.faker.datatype.boolean()),
        pass: faker_1.faker.internet.password()
    };
}
//# sourceMappingURL=seed.js.map