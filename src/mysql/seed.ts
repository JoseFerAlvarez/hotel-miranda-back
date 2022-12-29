import { dbQuery } from './connection';
import connection from './connection';
import { faker } from '@faker-js/faker';


connection.connect();
Promise.all([createRoomsTable(), createUsersTable(), insertRooms(20), insertUsers(20)])
    .then(() => connection.end());

async function createRoomsTable() {
    await dbQuery("CREATE OR REPLACE TABLE rooms ( idroom VARCHAR(255), number SMALLINT, photo VARCHAR(500), type VARCHAR(255), amenities VARCHAR(500), price INT, offer INT, status VARCHAR(5), PRIMARY KEY(idroom));", null);
}

async function createUsersTable() {
    await dbQuery("CREATE OR REPLACE TABLE users (iduser VARCHAR(255), name VARCHAR(255), photo VARCHAR(500), position VARCHAR(255), email VARCHAR(255), phone VARCHAR(50), date VARCHAR(100), description VARCHAR(500), state VARCHAR(5), pass VARCHAR(255), PRIMARY KEY(iduser));", null);
}

async function insertRooms(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const room = setRandomRoom();
        await dbQuery("INSERT INTO rooms SET ?", room);
    }
}

async function insertUsers(number: number): Promise<void> {
    for (let i = 0; i < number; i++) {
        const user = setRandomUser();
        await dbQuery("INSERT INTO users SET ?", user);
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


