import connection, { dbQuery } from './src/db/connection';
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";
import {
    IntBooking,
    IntRoom,
    IntContact,
    IntUser
} from './src/interfaces/interfaces';


run();

const rooms: IntRoom[] = [];
const users: IntUser[] = [];
const bookings: IntBooking[] = [];
const contacts: IntContact[] = [];

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
            numroom SMALLINT NOT NULL,
            photo VARCHAR(500),
            typeroom VARCHAR(50),
            amenities VARCHAR(500),
            price INT,
            offer INT,
            status TINYINT NOT NULL,
            cancellation VARCHAR(2000),
            PRIMARY KEY (idroom));`,
        null);
}
async function createUsersTable() {
    await dbQuery(/*SQL*/
        `CREATE OR REPLACE TABLE users (
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
            PRIMARY KEY (iduser));`,
        null);
}
async function createBookingsTable() {
    await dbQuery(/*SQL*/
        `CREATE OR REPLACE TABLE bookings (
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
            PRIMARY KEY (idbooking));`,
        null);
}
async function createContactsTable() {
    await dbQuery(/*SQL*/
        `CREATE OR REPLACE TABLE contacts (
            idcontact INT NOT NULL AUTO_INCREMENT,
            date VARCHAR(255) NOT NULL,
            customer VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            header VARCHAR(255) NOT NULL,
            comment VARCHAR(500) NOT NULL,
            PRIMARY KEY (idcontact));`,
        null);
}


async function insertRooms(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room: IntRoom = await setRandomRoom();
        await rooms.push(room);
        await dbQuery("INSERT INTO rooms SET ?", room);
    }
}

async function insertUsers(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const user: IntUser = await setRandomUser();
        await users.push(user);
        await dbQuery("INSERT INTO users SET ?", user);
    }
}

async function insertBookings(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room: IntRoom = rooms[Math.round(Math.random() * rooms.length - 1)];
        const user: IntUser = users[Math.round(Math.random() * rooms.length - 1)];
        const booking: IntBooking = await setRandomBooking(room, user);
        await bookings.push(booking);
        await dbQuery("INSERT INTO bookings SET ?", booking);
    }
}

async function insertContacts(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const contact: IntContact = await setRandomContact();
        await contacts.push(contact);
        await dbQuery("INSERT INTO contacts SET ?", contact);
    }
}

async function setRandomRoom(): Promise<IntRoom> {
    return await {
        numroom: faker.datatype.number({ max: 1000 }),
        photo: await generateRandomPhoto(),
        typeroom: generateRandomType(),
        amenities: generateRandomAmenities(),
        price: faker.datatype.number({ max: 100000 }),
        offer: faker.datatype.number({ max: 90 }),
        status: faker.datatype.number({ min: 0, max: 1 }),
        cancellation: faker.lorem.lines(3)
    }
}

async function setRandomUser(): Promise<IntUser> {
    return await {
        nameuser: faker.name.fullName(),
        photo: faker.image.imageUrl(1920, 1080, "human"),
        position: faker.datatype.number({ min: 0, max: 2 }),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        date: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        description: faker.random.words(30),
        status: faker.datatype.number({ min: 0, max: 1 }),
        pass: await getHashPass(faker.internet.password())
    }
}

async function getHashPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, 10)
        .then((result) => result);
}

async function setRandomBooking(room: IntRoom, user: IntUser): Promise<IntBooking> {
    const bookingOrder: Date = generateRandomDate(null);
    const bookingCheckIn: Date = generateRandomDate(bookingOrder);
    const bookingCheckOut: Date = generateRandomDate(bookingCheckIn);

    const bookingOrderFormat: string = bookingOrder.toLocaleDateString("es-ES");
    const bookingCheckInFormat: string = bookingCheckIn.toLocaleDateString("es-ES");
    const bookingCheckOutFormat: string = bookingCheckOut.toLocaleDateString("es-ES");

    return await {
        nameuser: user.nameuser,
        bookingorder: bookingOrderFormat,
        checkin: bookingCheckInFormat,
        checkout: bookingCheckOutFormat,
        typeroom: room.typeroom,
        numroom: room.numroom,
        price: room.price,
        request: faker.random.words(3),
        amenities: room.amenities,
        photos: room.photo,
        description: faker.random.words(30),
        status: faker.datatype.number({ min: 0, max: 2 }),
    }
}

async function setRandomContact(): Promise<IntContact> {
    return await {
        date: String(faker.date.between('2021-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z')),
        customer: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        header: faker.random.words(5),
        comment: faker.random.words(30)
    }
}

function generateRandomAmenities(): string {
    const number: number = Math.round(Math.random() * 10 - 1);
    const amenities: string[] = ["Air conditioner", "Breakfast", "Cleaning", "Grocery", "Shop near", "High speed WiFi", "Kitchen", "Shower", "Single bed", "Towels"];

    return faker.helpers.arrayElements(amenities, number).toString();
}

async function generateRandomPhoto(): Promise<string> {
    return await fetch(faker.image.imageUrl(1920, 1080, "room")).then((response) => response.url);
}

function generateRandomType(): string {
    const roomtypes: string[] = ["Single Bed", "Double Bed", "Double Superior", "Suite"];
    return faker.helpers.arrayElement(roomtypes);
}

function generateRandomDate(date: Date | null): Date {
    const initDate = "2020-01-01T00:00:00.000Z";
    const currentDate = String(new Date(Date.now()).toISOString());
    const randomdate: Date = faker.date.between(date || initDate, currentDate);

    return randomdate;
}

