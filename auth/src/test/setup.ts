import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

// Create a new mongoDB memory connection and connect it.
// We are using MongoMemoryServer because we don't want to access single mongo instance for different services like "auth", "payments", etc.
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "abc";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Delete all previous collections before every test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Stop all DB instances after all tests
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
