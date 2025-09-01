import { Server } from "http";
import app from "./app";
import { env } from "./config/env";
import { connect } from "mongoose";

let server: Server;

(async function main() {
  try {
    await connect(env.MONGODB_URI);
    console.log("✅ Database connected");
    server = app.listen(env.PORT, () => {
      console.log(`✅ Server is running on port: ${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
