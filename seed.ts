import connection, { dbQuery } from './src/db/connection';
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";


run();

const rooms = [];
const users = [];
const bookings = [];
const contacts = [];

async function run() {
    await connection.connect();
    await createRoomsTable();
    await createUsersTable();
    await createBookingsTable();
    await createContactsTable();
    await insertRooms(20);
    await insertUsers(20);
    await insertBookings(20);
    await insertContacts(20);
    await connection.end();
}

async function createRoomsTable() {
    await dbQuery(/*SQL*/
        `CREATE OR REPLACE TABLE rooms (
            idroom INT NOT NULL AUTO_INCREMENT,
            numroom SMALLINT,
            photo VARCHAR(500),
            type TINYINT,
            amenities VARCHAR(500),
            price INT,
            offer INT,
            status TINYINT,
            PRIMARY KEY (idroom));`,
        null);
}
async function createUsersTable() {
    await dbQuery(/*SQL*/
        `CREATE OR REPLACE TABLE users (
            iduser INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            photo VARCHAR(500),
            position VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(50),
            date VARCHAR(100),
            description VARCHAR(500),
            state TINYINT,
            pass VARCHAR(255),
            PRIMARY KEY (iduser));`,
        null);
}
async function createBookingsTable() {
    await dbQuery(/*SQL*/
        `CREATE OR REPLACE TABLE bookings (
            idbooking INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255),
            bookingorder VARCHAR(100),
            checkin VARCHAR(100),
            checkout VARCHAR(100),
            type TINYINT,
            numroom SMALLINT,
            price INT,
            request VARCHAR(255),
            amenities VARCHAR(500),
            photos VARCHAR(500),
            description VARCHAR(500),
            state TINYINT,
            PRIMARY KEY (idbooking));`,
        null);
}
async function createContactsTable() {
    await dbQuery(/*SQL*/
        `CREATE OR REPLACE TABLE contacts (
            idcontact INT NOT NULL AUTO_INCREMENT,
            date VARCHAR(255),
            customer VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(50),
            header VARCHAR(255),
            comment VARCHAR(500),
            PRIMARY KEY (idcontact));`,
        null);
}


async function insertRooms(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room = await setRandomRoom();
        rooms.push(room);
        await dbQuery("INSERT INTO rooms SET ?", room);
    }
}

async function insertUsers(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const user = await setRandomUser();
        users.push(user);
        await dbQuery("INSERT INTO users SET ?", user);
    }
}

async function insertBookings(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room = rooms[Math.round(Math.random() * rooms.length - 1)];
        const user = users[Math.round(Math.random() * rooms.length - 1)];
        const booking = await setRandomBooking(room, user);
        bookings.push(booking);
        await dbQuery("INSERT INTO bookings SET ?", booking);
    }
}

async function insertContacts(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const contact = await setRandomContact();
        contacts.push(contact);
        await dbQuery("INSERT INTO contacts SET ?", contact);
    }
}

async function setRandomRoom() {
    return await {
        numroom: faker.datatype.number({ max: 1000 }),
        photo: faker.image.imageUrl(1920, 1080, "room"),
        type: faker.datatype.number({ min: 0, max: 3 }),
        amenities: String(faker.random.words(10)),
        price: faker.datatype.number({ max: 100000 }),
        offer: faker.datatype.number({ max: 100 }),
        status: faker.datatype.number({ min: 0, max: 1 })
    }
}

async function setRandomUser() {
    return await {
        name: faker.name.fullName(),
        photo: faker.image.imageUrl(1920, 1080, "human"),
        position: faker.datatype.number({ min: 0, max: 2 }),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        date: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        description: faker.random.words(30),
        state: faker.datatype.number({ min: 0, max: 1 }),
        pass: await getHashPass(faker.internet.password())
    }
}

async function getHashPass(pass: string) {
    return await bcrypt.hash(pass, 10)
        .then((result) => result);
}

async function setRandomBooking(room, user) {

    return await {
        name: user.name,
        bookingorder: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        checkin: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        checkout: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        type: room.type,
        numroom: room.numroom,
        price: room.price,
        request: faker.random.words(3),
        amenities: room.amenities,
        photos: room.photo,
        description: faker.random.words(30),
        state: faker.datatype.number({ min: 0, max: 2 }),
    }
}

async function setRandomContact() {
    return await {
        date: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        customer: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        header: faker.random.words(5),
        comment: faker.random.words(30)
    }
}


