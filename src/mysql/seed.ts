import { dbQuery } from './connection';
import connection from './connection';
import { faker } from '@faker-js/faker';


const rooms = [];
const users = [];
const bookings = [];
const contacts = [];

connection.connect();

Promise.all([
    createRoomsTable(),
    createUsersTable(),
    createBookingsTable(),
    createContactsTable()])
    .then(() => insertRooms(20))
    .then(() => insertUsers(20))
    .then(() => insertBookings(20))
    .then(() => insertContacts(20))
    .then(() => connection.end());

async function createRoomsTable() {
    await dbQuery("CREATE OR REPLACE TABLE rooms ( idroom VARCHAR(255), number SMALLINT, photo VARCHAR(500), type VARCHAR(255), amenities VARCHAR(500), price INT, offer INT, status VARCHAR(5), PRIMARY KEY(idroom));", null);
}
async function createUsersTable() {
    await dbQuery("CREATE OR REPLACE TABLE users (iduser VARCHAR(255), name VARCHAR(255), photo VARCHAR(500), position VARCHAR(255), email VARCHAR(255), phone VARCHAR(50), date VARCHAR(100), description VARCHAR(500), state VARCHAR(5), pass VARCHAR(255), PRIMARY KEY(iduser));", null);
}
async function createBookingsTable() {
    await dbQuery("CREATE OR REPLACE TABLE bookings (idbooking VARCHAR(255), name VARCHAR(255), bookingorder VARCHAR(100), checkin VARCHAR(100), checkout VARCHAR(100), typeroom VARCHAR(255), numroom INT, price INT, request VARCHAR(255), amenities VARCHAR(255), photos VARCHAR(500), type VARCHAR(255), description VARCHAR(500), state VARCHAR(10), PRIMARY KEY(idbooking));", null);
}
async function createContactsTable() {
    await dbQuery("CREATE OR REPLACE TABLE contacts (idcontact VARCHAR(255), date VARCHAR(255), customer VARCHAR(255), email VARCHAR(255), phone VARCHAR(50), header VARCHAR(255), comment VARCHAR(500), PRIMARY KEY(idcontact));", null);
}


async function insertRooms(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room = setRandomRoom();
        rooms.push(room);
        await dbQuery("INSERT INTO rooms SET ?", room);
    }
}

async function insertUsers(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const user = setRandomUser();
        users.push(user);
        await dbQuery("INSERT INTO users SET ?", user);
    }
}

async function insertBookings(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const booking = setRandomBooking();
        bookings.push(booking);
        await dbQuery("INSERT INTO bookings SET ?", booking);
    }
}

async function insertContacts(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const contact = setRandomContact();
        contacts.push(contact);
        await dbQuery("INSERT INTO contacts SET ?", contact);
    }
}

function setRandomRoom() {
    return {
        idroom: faker.datatype.uuid(),
        number: faker.datatype.number({ max: 1000 }),
        photo: faker.image.city(),
        type: faker.random.words(3),
        amenities: String(faker.random.words(10)),
        price: faker.datatype.number({ max: 100000 }),
        offer: faker.datatype.number({ max: 100 }),
        status: String(faker.datatype.boolean())
    }
}

function setRandomUser() {
    return {
        iduser: faker.datatype.uuid(),
        name: faker.name.fullName(),
        photo: faker.image.avatar(),
        position: faker.commerce.department(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        date: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        description: faker.random.words(30),
        state: String(faker.datatype.boolean()),
        pass: faker.internet.password()
    }
}

function setRandomBooking() {

    const room = rooms[Math.round(Math.random() * rooms.length - 1)];
    const user = users[Math.round(Math.random() * rooms.length - 1)];

    return {
        idbooking: faker.datatype.uuid(),
        name: user.name,
        bookingorder: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        checkin: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        checkout: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        typeroom: room.type,
        numroom: room.number,
        price: room.price,
        request: faker.random.words(3),
        amenities: room.amenities,
        photos: room.photo,
        type: faker.random.words(3),
        description: faker.random.words(30),
        state: String(faker.datatype.boolean())
    }
}

function setRandomContact() {
    return {
        idcontact: faker.datatype.uuid(),
        date: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        customer: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        header: faker.random.words(5),
        comment: faker.random.words(30)
    }
}


