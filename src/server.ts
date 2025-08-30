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

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejecttion detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
