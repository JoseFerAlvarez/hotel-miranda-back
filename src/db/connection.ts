import mongoose from "mongoose";

const mongoDB = process.env.MONGO_LOCAL_CONNECTION;

export async function connect(database: string | null) {
    await mongoose.connect(database || mongoDB);
}

export async function disconnect() {
    await mongoose.disconnect();
}
