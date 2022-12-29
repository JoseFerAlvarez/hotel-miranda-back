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
const bcrypt_1 = __importDefault(require("bcrypt"));
const rooms = [];
const users = [];
const bookings = [];
const contacts = [];
connection_2.default.connect();
Promise.all([
    createRoomsTable(),
    createUsersTable(),
    createBookingsTable(),
    createContactsTable()
])
    .then(() => insertRooms(20))
    .then(() => insertUsers(20))
    .then(() => insertBookings(20))
    .then(() => insertContacts(20))
    .then(() => connection_2.default.end());
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
function createBookingsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)("CREATE OR REPLACE TABLE bookings (idbooking VARCHAR(255), name VARCHAR(255), bookingorder VARCHAR(100), checkin VARCHAR(100), checkout VARCHAR(100), typeroom VARCHAR(255), numroom INT, price INT, request VARCHAR(255), amenities VARCHAR(255), photos VARCHAR(500), type VARCHAR(255), description VARCHAR(500), state VARCHAR(10), PRIMARY KEY(idbooking));", null);
    });
}
function createContactsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)("CREATE OR REPLACE TABLE contacts (idcontact VARCHAR(255), date VARCHAR(255), customer VARCHAR(255), email VARCHAR(255), phone VARCHAR(50), header VARCHAR(255), comment VARCHAR(500), PRIMARY KEY(idcontact));", null);
    });
}
function insertRooms(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const room = yield setRandomRoom();
            rooms.push(room);
            yield (0, connection_1.dbQuery)("INSERT INTO rooms SET ?", room);
        }
    });
}
function insertUsers(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const user = yield setRandomUser();
            users.push(user);
            yield (0, connection_1.dbQuery)("INSERT INTO users SET ?", user);
        }
    });
}
function insertBookings(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const booking = yield setRandomBooking();
            bookings.push(booking);
            yield (0, connection_1.dbQuery)("INSERT INTO bookings SET ?", booking);
        }
    });
}
function insertContacts(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const contact = yield setRandomContact();
            contacts.push(contact);
            yield (0, connection_1.dbQuery)("INSERT INTO contacts SET ?", contact);
        }
    });
}
function setRandomRoom() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield {
            idroom: faker_1.faker.datatype.uuid(),
            number: faker_1.faker.datatype.number({ max: 1000 }),
            photo: faker_1.faker.image.city(),
            type: faker_1.faker.random.words(3),
            amenities: String(faker_1.faker.random.words(10)),
            price: faker_1.faker.datatype.number({ max: 100000 }),
            offer: faker_1.faker.datatype.number({ max: 100 }),
            status: String(faker_1.faker.datatype.boolean())
        };
    });
}
function setRandomUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield {
            iduser: faker_1.faker.datatype.uuid(),
            name: faker_1.faker.name.fullName(),
            photo: faker_1.faker.image.avatar(),
            position: faker_1.faker.commerce.department(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            date: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            description: faker_1.faker.random.words(30),
            state: String(faker_1.faker.datatype.boolean()),
            pass: yield getHashPass(faker_1.faker.internet.password())
        };
    });
}
function getHashPass(pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(pass, 10)
            .then((result) => result);
    });
}
function setRandomBooking() {
    return __awaiter(this, void 0, void 0, function* () {
        const room = rooms[Math.round(Math.random() * rooms.length - 1)];
        const user = users[Math.round(Math.random() * rooms.length - 1)];
        return yield {
            idbooking: faker_1.faker.datatype.uuid(),
            name: user.name,
            bookingorder: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            checkin: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            checkout: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            typeroom: room.type,
            numroom: room.number,
            price: room.price,
            request: faker_1.faker.random.words(3),
            amenities: room.amenities,
            photos: room.photo,
            type: faker_1.faker.random.words(3),
            description: faker_1.faker.random.words(30),
            state: String(faker_1.faker.datatype.boolean())
        };
    });
}
function setRandomContact() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield {
            idcontact: faker_1.faker.datatype.uuid(),
            date: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            customer: faker_1.faker.name.fullName(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            header: faker_1.faker.random.words(5),
            comment: faker_1.faker.random.words(30)
        };
    });
}
//# sourceMappingURL=seed.js.map