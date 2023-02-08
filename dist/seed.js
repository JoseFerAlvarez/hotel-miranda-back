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
        yield (0, connection_1.connect)(process.env.MONGO_LOCAL_CONNECTION);
        yield insertRooms(50);
        yield insertUsers(50);
        yield insertContacts(50);
        yield insertBookings(50);
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
            photos: yield generateRandomPhotos(),
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
            photo: yield generateRandomAvatar(),
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
            reference: faker_1.faker.vehicle.vrm(),
            checked: faker_1.faker.datatype.number({ min: 0, max: 1 }),
            status: faker_1.faker.datatype.number({ min: 0, max: 2 })
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
            comment: faker_1.faker.lorem.lines(),
            archived: faker_1.faker.datatype.number({ min: 0, max: 1 })
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
    return __awaiter(this, void 0, void 0, function* () {
        const photos = [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1631049421450-348ccd7f8949?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1631048730670-ff5cd0d08f15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        ];
        const number = Math.round(Math.random() * (5 - 3) + 3);
        return yield faker_1.faker.helpers.arrayElements(photos, number);
    });
}
/* Function helpers to generate a random user */
function generateRandomPosition() {
    const userposition = ["Manager", "Room service", "Reception"];
    return faker_1.faker.helpers.arrayElement(userposition);
}
function generateRandomAvatar() {
    return __awaiter(this, void 0, void 0, function* () {
        const photos = [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
            "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
            "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1559637621-d766677659e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1612999590549-978cfde66b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            "https://images.unsplash.com/photo-1504199367641-aba8151af406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        ];
        return yield faker_1.faker.helpers.arrayElement(photos);
    });
}
/* Function helpers to generate a random booking */
function getRandomUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userQuery = schemas_1.User.findOne({ "_id": user._id });
        return yield userQuery.exec()
            .then((result) => result);
    });
}
function getRandomRoom(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomQuery = schemas_1.Room.findOne({ "_id": room._id });
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