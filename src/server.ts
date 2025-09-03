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
