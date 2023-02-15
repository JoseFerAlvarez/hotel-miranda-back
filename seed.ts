import { faker } from '@faker-js/faker';
import { connect, disconnect } from "./src/db/connection";
import { getHashPass } from './src/helpers/helpers';

import {
    Room,
    User,
    Booking,
    Contact
} from "./src/Schemas/schemas";

import {
    IntRoom,
    IntBooking,
    IntContact,
    IntUser
} from "./src/interfaces/interfaces";


const roomList: IntRoom[] = [];
const userList: IntUser[] = [];

run();

async function run() {
    await connect(process.env.MONGO_ATLAS_CONNECTION);

    await insertRooms(20);
    await insertUsers(20);

    await insertContacts(20);
    await insertBookings(20);

    await disconnect();
}

/* Puts in an array the number of rooms given by a parameter */
async function insertRooms(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room: IntRoom = await generateRandomRoom();
        roomList.push(room);

        await Room.create(room);
    }
}

/* Puts in an array the number of users given by a parameter */
async function insertUsers(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const user: IntUser = await generateRandomUser();
        userList.push(user);

        await User.create(user);
    }
}

/* Puts in an array the number of bookings given by a parameter */
async function insertBookings(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room: IntRoom = roomList[Math.round(Math.random() * roomList.length - 1)];
        const user: IntUser = userList[Math.round(Math.random() * roomList.length - 1)];
        const booking: IntBooking = await generateRandomBooking(await getRandomRoom(room), await getRandomUser(user));

        await Booking.create(booking);
    }
}

/* Puts in an array the number of contacts given by a parameter */
async function insertContacts(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const contact: IntContact = await generateRandomContact();

        await Contact.create(contact);
    }
}

/* Generate a random room */
async function generateRandomRoom(): Promise<IntRoom> {
    return await new Room<IntRoom>({
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
async function generateRandomUser(): Promise<IntUser> {
    return await new User<IntUser>({
        name: faker.name.fullName(),
        photo: faker.image.imageUrl(1920, 1080, "face"),
        position: generateRandomPosition(),
        email: faker.internet.email(),
        phone: faker.phone.number('+34 6## ## ## ##'),
        date: generateRandomDate(null),
        description: faker.random.words(30),
        status: faker.datatype.number({ min: 0, max: 1 }),
        pass: await getHashPass(faker.internet.password())
    });
}

/* Generate a random booking from a room and a user */
async function generateRandomBooking(room: IntRoom, user: IntUser): Promise<IntBooking> {
    const bookingOrder: Date = generateRandomDate(null);
    const bookingCheckIn: Date = generateRandomDate(bookingOrder);
    const bookingCheckOut: Date = generateRandomDate(bookingCheckIn);

    return await new Booking({
        user_id: user._id,
        room_id: room._id,
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
async function generateRandomContact(): Promise<IntContact> {
    return await new Contact<IntContact>({
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
    const photos: string[] = [];
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

/* Function helpers to generate a random booking */
async function getRandomUser(user): Promise<any> {
    const userQuery = User.findOne({ user });

    return await userQuery.exec()
        .then((result) => result);
}

async function getRandomRoom(room): Promise<any> {
    const roomQuery = Room.findOne({ room });

    return await roomQuery.exec()
        .then((result) => result);
}

/* Function helpers to generate a random date */
function generateRandomDate(date: Date | null): Date {
    const initDate = "2020-01-01T00:00:00.000Z";
    const currentDate = String(new Date(Date.now()).toISOString());
    const randomdate: Date = faker.date.between(date || initDate, currentDate);

    return randomdate;
}



