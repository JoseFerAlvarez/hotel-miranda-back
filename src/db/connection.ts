import mongoose from "mongoose";

const mongoDB = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=test+1.6.1";

export async function connect(database: string | null) {
    await mongoose.connect(database || mongoDB);
}

export async function disconnect() {
    await mongoose.disconnect();
}
