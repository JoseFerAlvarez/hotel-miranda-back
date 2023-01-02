import { faker } from '@faker-js/faker';
import { connect } from "./src/db/connection";
import bcrypt from "bcrypt";
import {
    Room,
    User,
    Booking,
    Contact
} from "./src/Schemas/schemas";


const roomList: typeof Room[] = [];
const userList: typeof User[] = [];
const bookingList: typeof Booking[] = [];
const contactList: typeof Contact[] = [];

run();

async function run() {
    await connect(null);

    await insertRooms(20);
    await insertUsers(20);
    await insertContacts(20);
    await insertBookings(20);
}

/* Puts in an array the number of rooms given by a parameter */
async function insertRooms(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room = await generateRandomRoom();
        roomList.push(room);

        room.save();
    }
}

/* Puts in an array the number of users given by a parameter */
async function insertUsers(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const user = await generateRandomUser();
        userList.push(user);

        user.save();
    }
}

/* Puts in an array the number of bookings given by a parameter */
async function insertBookings(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room = roomList[Math.round(Math.random() * roomList.length - 1)];
        const user = userList[Math.round(Math.random() * roomList.length - 1)];
        const booking = await generateRandomBooking(room, user);
        bookingList.push(booking);

        booking.save();
    }
}

/* Puts in an array the number of contacts given by a parameter */
async function insertContacts(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const contact = await generateRandomContact();
        contactList.push(contact);

        contact.save();
    }
}

/* Generate a random room */
async function generateRandomRoom(): Promise<any> {
    return await new Room({
        numroom: faker.datatype.number({ max: 1000 }),
        photos: generateRandomPhotos(),
        type: generateRandomType(),
        amenities: generateRandomAmenities(),
        price: faker.datatype.number({ max: 100000 }),
        offer: faker.datatype.number({ max: 100 }),
        status: faker.datatype.number({ min: 0, max: 1 }),
        cancellation: faker.lorem.lines()
    });
}

/* Generate a random user */
async function generateRandomUser(): Promise<any> {
    return await new User({
        name: faker.name.fullName(),
        photo: faker.image.imageUrl(1920, 1080, "face"),
        position: generateRandomPosition(),
        email: faker.internet.email(),
        phone: faker.phone.number('+34 6## ## ## ##'),
        date: generateRandomDate(null),
        description: faker.random.words(30),
        state: faker.datatype.number({ min: 0, max: 1 }),
        pass: await getHashPass(faker.internet.password())
    });
}

/* Generate a random booking from a room and a user */
async function generateRandomBooking(room, user): Promise<any> {
    const bookingOrder: Date = generateRandomDate(null);
    const bookingCheckIn: Date = generateRandomDate(bookingOrder);
    const bookingCheckOut: Date = generateRandomDate(bookingCheckIn);

    return await new Booking({
        name: user.name,
        order: bookingOrder,
        checkin: bookingCheckIn,
        checkout: bookingCheckOut,
        type: room.type,
        numroom: room.numroom,
        price: room.price,
        request: faker.lorem.lines(1),
        amenities: room.amenities,
        photos: room.photos,
        description: faker.lorem.lines(),
        status: faker.datatype.number({ min: 0, max: 2 }),
    });
}

/* Generate a random contact */
async function generateRandomContact(): Promise<any> {
    return await new Contact({
        date: generateRandomDate(null),
        customer: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+34 6## ## ## ##'),
        header: faker.lorem.lines(1),
        comment: faker.lorem.lines()
    });
}

/* Function helpers to generate a random room */
function generateRandomType(): string {
    const roomtypes: string[] = ["Single Bed", "Double Bed", "Double Superior", "Suite"];
    return faker.helpers.arrayElement(roomtypes);
}

function generateRandomAmenities(): string[] {
    const number: number = Math.round(Math.random() * 10 - 1);
    const amenities: string[] = ["Air conditioner", "Breakfast", "Cleaning", "Grocery", "Shop near", "High speed WiFi", "Kitchen", "Shower", "Single bed", "Towels"];

    return faker.helpers.arrayElements(amenities, number);
}

function generateRandomPhotos(): string[] {
    const number: number = Math.round(Math.random() * (5 - 3) + 3);
    const photos = [];
    for (let i = 0; i < number; i++) {
        photos.push(faker.image.imageUrl(1920, 1080, "room"));
    }

    return photos;
}


/* Function helpers to generate a random user */
function generateRandomPosition(): string {
    const userposition: string[] = ["Manager", "Room service", "Reception"];
    return faker.helpers.arrayElement(userposition);
}

async function getHashPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, 10)
        .then((result) => result);
}


/* Function helpers to generate a random date */
function generateRandomDate(date: Date | null): Date {
    const initDate = "2020-01-01T00:00:00.000Z";
    const currentDate = String(new Date(Date.now()).toISOString());
    const randomdate: Date = faker.date.between(date || initDate, currentDate);

    return randomdate;
}



