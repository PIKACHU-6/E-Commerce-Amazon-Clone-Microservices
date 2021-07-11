import { app } from "./app";
import mongoose from "mongoose";

// We create this function to use async await for mongodb connection
const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }

    // Connect to mongoDB
    await mongoose.connect("mongodb://auth-mongo-cip-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Mongodb connected");
  } catch (err) {
    console.error(`Error: ${err}`);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Auth is listening on port ${port}!`);
  });
};
start();
