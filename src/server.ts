import { Server } from "http";
import mongoose = require("mongoose");
import { env } from "./app/config/env";
import app from "./app";

let server: Server;

(async function main() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("DB connected to MongoDB via mongoose");
    server = app.listen(env.PORT, () => {
      console.log(`Server is listening to port: ${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
