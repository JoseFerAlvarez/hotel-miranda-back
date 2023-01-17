"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const connection_1 = __importStar(require("./src/db/connection"));
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
run();
const rooms = [];
const users = [];
const bookings = [];
const contacts = [];
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connection_1.default.connect();
        yield createRoomsTable();
        yield createUsersTable();
        yield createBookingsTable();
        yield createContactsTable();
        yield insertRooms(20);
        yield insertUsers(20);
        yield insertBookings(20);
        yield insertContacts(20);
        yield connection_1.default.end();
    });
}
function createRoomsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)(/*SQL*/ `CREATE OR REPLACE TABLE rooms (
            idroom INT NOT NULL AUTO_INCREMENT,
            numroom SMALLINT NOT NULL,
            photo VARCHAR(500),
            typeroom VARCHAR(50),
            amenities VARCHAR(500),
            price INT,
            offer INT,
            status TINYINT NOT NULL,
            cancellation VARCHAR(2000),
            PRIMARY KEY (idroom));`, null);
    });
}
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)(/*SQL*/ `CREATE OR REPLACE TABLE users (
            iduser INT NOT NULL AUTO_INCREMENT,
            nameuser VARCHAR(255) NOT NULL,
            photo VARCHAR(500),
            position VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            date VARCHAR(100),
            description VARCHAR(500),
            status TINYINT NOT NULL,
            pass VARCHAR(255) NOT NULL,
            PRIMARY KEY (iduser));`, null);
    });
}
function createBookingsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)(/*SQL*/ `CREATE OR REPLACE TABLE bookings (
            idbooking INT NOT NULL AUTO_INCREMENT,
            nameuser VARCHAR(255) NOT NULL,
            bookingorder VARCHAR(100) NOT NULL,
            checkin VARCHAR(100) NOT NULL,
            checkout VARCHAR(100) NOT NULL,
            typeroom VARCHAR(50) NOT NULL,
            numroom SMALLINT NOT NULL,
            price INT NOT NULL,
            request VARCHAR(255),
            amenities VARCHAR(500),
            photos VARCHAR(500),
            description VARCHAR(500),
            status TINYINT NOT NULL,
            PRIMARY KEY (idbooking));`, null);
    });
}
function createContactsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.dbQuery)(/*SQL*/ `CREATE OR REPLACE TABLE contacts (
            idcontact INT NOT NULL AUTO_INCREMENT,
            date VARCHAR(255) NOT NULL,
            customer VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            header VARCHAR(255) NOT NULL,
            comment VARCHAR(500) NOT NULL,
            PRIMARY KEY (idcontact));`, null);
    });
}
function insertRooms(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const room = yield setRandomRoom();
            yield rooms.push(room);
            yield (0, connection_1.dbQuery)("INSERT INTO rooms SET ?", room);
        }
    });
}
function insertUsers(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const user = yield setRandomUser();
            yield users.push(user);
            yield (0, connection_1.dbQuery)("INSERT INTO users SET ?", user);
        }
    });
}
function insertBookings(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const room = rooms[Math.round(Math.random() * rooms.length - 1)];
            const user = users[Math.round(Math.random() * rooms.length - 1)];
            const booking = yield setRandomBooking(room, user);
            yield bookings.push(booking);
            yield (0, connection_1.dbQuery)("INSERT INTO bookings SET ?", booking);
        }
    });
}
function insertContacts(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const contact = yield setRandomContact();
            yield contacts.push(contact);
            yield (0, connection_1.dbQuery)("INSERT INTO contacts SET ?", contact);
        }
    });
}
function setRandomRoom() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield {
            numroom: faker_1.faker.datatype.number({ max: 1000 }),
            photo: yield generateRandomPhoto(),
            typeroom: generateRandomType(),
            amenities: generateRandomAmenities(),
            price: faker_1.faker.datatype.number({ max: 100000 }),
            offer: faker_1.faker.datatype.number({ max: 90 }),
            status: faker_1.faker.datatype.number({ min: 0, max: 1 }),
            cancellation: faker_1.faker.lorem.lines(3)
        };
    });
}
function setRandomUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield {
            nameuser: faker_1.faker.name.fullName(),
            photo: faker_1.faker.image.imageUrl(1920, 1080, "human"),
            position: faker_1.faker.datatype.number({ min: 0, max: 2 }),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            date: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            description: faker_1.faker.random.words(30),
            status: faker_1.faker.datatype.number({ min: 0, max: 1 }),
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
function setRandomBooking(room, user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield {
            nameuser: user.nameuser,
            bookingorder: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            checkin: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            checkout: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            typeroom: room.typeroom,
            numroom: room.numroom,
            price: room.price,
            request: faker_1.faker.random.words(3),
            amenities: room.amenities,
            photos: room.photo,
            description: faker_1.faker.random.words(30),
            status: faker_1.faker.datatype.number({ min: 0, max: 2 }),
        };
    });
}
function setRandomContact() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield {
            date: String(faker_1.faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
            customer: faker_1.faker.name.fullName(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            header: faker_1.faker.random.words(5),
            comment: faker_1.faker.random.words(30)
        };
    });
}
function generateRandomAmenities() {
    const number = Math.round(Math.random() * 10 - 1);
    const amenities = ["Air conditioner", "Breakfast", "Cleaning", "Grocery", "Shop near", "High speed WiFi", "Kitchen", "Shower", "Single bed", "Towels"];
    return faker_1.faker.helpers.arrayElements(amenities, number).toString();
}
function generateRandomPhoto() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetch(faker_1.faker.image.imageUrl(1920, 1080, "room")).then((response) => response.url);
    });
}
function generateRandomType() {
    const roomtypes = ["Single Bed", "Double Bed", "Double Superior", "Suite"];
    return faker_1.faker.helpers.arrayElement(roomtypes);
}
//# sourceMappingURL=seed.js.map