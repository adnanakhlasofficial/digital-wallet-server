import { Server } from "http";
import app from "./app";
import { env } from "./config/env";
import { connect } from "mongoose";
import { UserModel } from "./modules/user/user.model";
import { UserRole } from "./modules/user/user.interface";
import bcrypt from "bcryptjs";

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

(async function createAdmin() {
  try {
    const passwordHash = await bcrypt.hash(
      env.ADMIN_PASSWORD,
      Number(env.BCRYPT_SALT)
    );

    const admin = await UserModel.findOne({ phone: env.ADMIN_PHONE });

    if (!admin) {
      const createAdmin = {
        name: "Admin",
        phone: env.ADMIN_PHONE,
        password: passwordHash,
        role: UserRole.ADMIN,
      };

      await UserModel.create(createAdmin);
    }
    console.log(`Admin created successfully.`);
  } catch (error) {
    console.log(error);
  }
})();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected... Server shutting down..", err);

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
