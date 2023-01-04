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
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const connection_1 = require("./src/db/connection");
const helpers_1 = require("./src/helpers/helpers");
const schemas_1 = require("./src/Schemas/schemas");
const roomList = [];
const userList = [];
run();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.connect)(process.env.MONGO_ATLAS_CONNECTION);
        yield insertRooms(20);
        yield insertUsers(20);
        yield insertContacts(20);
        yield insertBookings(20);
        yield (0, connection_1.disconnect)();
    });
}
/* Puts in an array the number of rooms given by a parameter */
function insertRooms(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const room = yield generateRandomRoom();
            roomList.push(room);
            yield schemas_1.Room.create(room);
        }
    });
}
/* Puts in an array the number of users given by a parameter */
function insertUsers(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const user = yield generateRandomUser();
            userList.push(user);
            yield schemas_1.User.create(user);
        }
    });
}
/* Puts in an array the number of bookings given by a parameter */
function insertBookings(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const room = roomList[Math.round(Math.random() * roomList.length - 1)];
            const user = userList[Math.round(Math.random() * roomList.length - 1)];
            const booking = yield generateRandomBooking(yield getRandomRoom(room), yield getRandomUser(user));
            yield schemas_1.Booking.create(booking);
        }
    });
}
/* Puts in an array the number of contacts given by a parameter */
function insertContacts(number) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < number; i++) {
            const contact = yield generateRandomContact();
            yield schemas_1.Contact.create(contact);
        }
    });
}
/* Generate a random room */
function generateRandomRoom() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new schemas_1.Room({
            numroom: faker_1.faker.datatype.number({ max: 1000 }),
            photos: generateRandomPhotos(),
            type: generateRandomType(),
            amenities: generateRandomAmenities(),
            price: faker_1.faker.datatype.number({ max: 100000 }),
            offer: faker_1.faker.datatype.number({ max: 100 }),
            status: faker_1.faker.datatype.number({ min: 0, max: 1 }),
            cancellation: faker_1.faker.lorem.lines()
        });
    });
}
/* Generate a random user */
function generateRandomUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new schemas_1.User({
            name: faker_1.faker.name.fullName(),
            photo: faker_1.faker.image.imageUrl(1920, 1080, "face"),
            position: generateRandomPosition(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number('+34 6## ## ## ##'),
            date: generateRandomDate(null),
            description: faker_1.faker.random.words(30),
            status: faker_1.faker.datatype.number({ min: 0, max: 1 }),
            pass: yield (0, helpers_1.getHashPass)(faker_1.faker.internet.password())
        });
    });
}
/* Generate a random booking from a room and a user */
function generateRandomBooking(room, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookingOrder = generateRandomDate(null);
        const bookingCheckIn = generateRandomDate(bookingOrder);
        const bookingCheckOut = generateRandomDate(bookingCheckIn);
        return yield new schemas_1.Booking({
            user_id: user._id,
            room_id: room._id,
            name: user.name,
            order: bookingOrder,
            checkin: bookingCheckIn,
            checkout: bookingCheckOut,
            type: room.type,
            numroom: room.numroom,
            price: room.price,
            request: faker_1.faker.lorem.lines(1),
            amenities: room.amenities,
            photos: room.photos,
            description: faker_1.faker.lorem.lines(),
            status: faker_1.faker.datatype.number({ min: 0, max: 2 }),
        });
    });
}
/* Generate a random contact */
function generateRandomContact() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new schemas_1.Contact({
            date: generateRandomDate(null),
            customer: faker_1.faker.name.fullName(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number('+34 6## ## ## ##'),
            header: faker_1.faker.lorem.lines(1),
            comment: faker_1.faker.lorem.lines()
        });
    });
}
/* Function helpers to generate a random room */
function generateRandomType() {
    const roomtypes = ["Single Bed", "Double Bed", "Double Superior", "Suite"];
    return faker_1.faker.helpers.arrayElement(roomtypes);
}
function generateRandomAmenities() {
    const number = Math.round(Math.random() * 10 - 1);
    const amenities = ["Air conditioner", "Breakfast", "Cleaning", "Grocery", "Shop near", "High speed WiFi", "Kitchen", "Shower", "Single bed", "Towels"];
    return faker_1.faker.helpers.arrayElements(amenities, number);
}
function generateRandomPhotos() {
    const number = Math.round(Math.random() * (5 - 3) + 3);
    const photos = [];
    for (let i = 0; i < number; i++) {
        photos.push(faker_1.faker.image.imageUrl(1920, 1080, "room"));
    }
    return photos;
}
/* Function helpers to generate a random user */
function generateRandomPosition() {
    const userposition = ["Manager", "Room service", "Reception"];
    return faker_1.faker.helpers.arrayElement(userposition);
}
/* Function helpers to generate a random booking */
function getRandomUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userQuery = schemas_1.User.findOne({ user });
        return yield userQuery.exec()
            .then((result) => result);
    });
}
function getRandomRoom(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomQuery = schemas_1.Room.findOne({ room });
        return yield roomQuery.exec()
            .then((result) => result);
    });
}
/* Function helpers to generate a random date */
function generateRandomDate(date) {
    const initDate = "2020-01-01T00:00:00.000Z";
    const currentDate = String(new Date(Date.now()).toISOString());
    const randomdate = faker_1.faker.date.between(date || initDate, currentDate);
    return randomdate;
}
//# sourceMappingURL=seed.js.map