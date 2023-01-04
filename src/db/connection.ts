import mongoose from "mongoose";

const mongoDB = process.env.MONGO_ATLAS_CONNECTION;

export async function connect(database?: string) {
    await mongoose.connect(database || mongoDB);
}

export async function disconnect() {
    await mongoose.disconnect();
}
