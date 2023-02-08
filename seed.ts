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
    await connect(process.env.MONGO_LOCAL_CONNECTION);

    await insertRooms(50);
    await insertUsers(50);

    await insertContacts(50);
    await insertBookings(50);

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
        photos: await generateRandomPhotos(),
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
        photo: await generateRandomAvatar(),
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
        reference: faker.vehicle.vrm(),
        checked: faker.datatype.number({ min: 0, max: 1 }),
        status: faker.datatype.number({ min: 0, max: 2 })
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
        comment: faker.lorem.lines(),
        archived: faker.datatype.number({ min: 0, max: 1 })
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

async function generateRandomPhotos(): Promise<string[]> {
    const photos: string[] = [
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
    const number: number = Math.round(Math.random() * (5 - 3) + 3);

    return await faker.helpers.arrayElements(photos, number);
}


/* Function helpers to generate a random user */
function generateRandomPosition(): string {
    const userposition: string[] = ["Manager", "Room service", "Reception"];
    return faker.helpers.arrayElement(userposition);
}

async function generateRandomAvatar(): Promise<string> {
    const photos: string[] = [
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

    return await faker.helpers.arrayElement(photos);
}

/* Function helpers to generate a random booking */
async function getRandomUser(user): Promise<IntUser> {
    const userQuery = User.findOne({ "_id": user._id });

    return await userQuery.exec()
        .then((result) => result);
}

async function getRandomRoom(room): Promise<IntRoom> {
    const roomQuery = Room.findOne({ "_id": room._id });

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



