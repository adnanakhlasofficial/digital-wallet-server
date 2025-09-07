# 💳 Digital Wallet System

A **secure, modular, and role-based backend API** for a digital wallet system (similar to **Bkash** or **Nagad**) built with **Express.js**, **TypeScript**, and **Mongoose**.
It supports **user registration**, **wallet management**, and **financial transactions** such as **send money**, **cash out**, and **cash in**, with **role-based access control** for `admin`, `agent`, and `user`.

---

## 🌐 Live API & Documentation

- **Live API Base URL:** [https://digital-wallet-server-tawny.vercel.app/api/v1](https://digital-wallet-server-tawny.vercel.app/api/v1)
- **Postman Documentation:** [View API Docs](https://documenter.getpostman.com/view/40732284/2sB3Hkr1dt)

---

## 🛠 Bootstrap Admin Credentials

When the server starts for the first time, if no admin exists, the system will **automatically create one** using the credentials from your `.env` file.

**Default Admin (from `.env`):**

```env
ADMIN_PHONE=01812345678
ADMIN_PASSWORD=admin@digital-wallet.com
```

---

## 🎯 Features

- 🔐 **JWT Authentication** with role-based authorization (`admin`, `agent`, `user`)
- 🏦 **Automatic Wallet Creation** on registration (initial balance: ৳50)
- 💰 **Wallet Operations**: Add money, withdraw, send money
- 🔁 **Transaction Tracking** with history
- 🎭 **Role-specific Permissions**
- 🧱 **Modular Architecture** for scalability
- 🛡 **Secure Password Hashing** with bcryptjs
- 📜 **Validation** with Zod
- 🌍 **CORS** & Cookie support

---

## 🛠 Tech Stack

| Package               | Purpose                         |
| --------------------- | ------------------------------- |
| **bcryptjs**          | Password hashing                |
| **cookie-parser**     | Parse cookies in requests       |
| **cors**              | Enable cross-origin requests    |
| **dotenv**            | Environment variable management |
| **express**           | Web framework                   |
| **http-status-codes** | Standard HTTP status codes      |
| **jsonwebtoken**      | JWT authentication              |
| **mongoose**          | MongoDB ODM                     |
| **zod**               | Schema validation               |

---

## 📂 Project Structure

```
src/
│   app.ts
│   server.ts
│
├── config/
│   └── env.ts
│
├── helpers/
│   └── app-error.ts
│
├── interfaces/
│   └── index.d.ts
│
├── middlewares/
│   ├── check-auth.ts
│   ├── global-error-handler.ts
│   ├── not-found.ts
│   └── validate-request.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.interface.ts
│   │   ├── auth.route.ts
│   │   ├── auth.service.ts
│   │   └── auth.validation.ts
│   │
│   ├── transaction/
│   │   ├── transaction.controller.ts
│   │   ├── transaction.interface.ts
│   │   ├── transaction.model.ts
│   │   ├── transaction.route.ts
│   │   └── transaction.service.ts
│   │
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.route.ts
│   │   ├── user.service.ts
│   │   └── user.validation.ts
│   │
│   └── wallet/
│       ├── wallet.controller.ts
│       ├── wallet.interface.ts
│       ├── wallet.model.ts
│       ├── wallet.route.ts
│       ├── wallet.service.ts
│       └── wallet.validation.ts
│
├── routes/
│   └── index.ts
│
└── utils/
    ├── catch-async.ts
    ├── cookie.ts
    ├── generate-transaction-id.ts
    ├── jwt.ts
    └── send-response.ts
```

---

## 🌐 API Routes

| Module          | Base Path      | Description                                       |
| --------------- | -------------- | ------------------------------------------------- |
| **Auth**        | `/auth`        | Register, login, refresh tokens                   |
| **User**        | `/user`        | Manage user profiles (admin only for listing all) |
| **Wallet**      | `/wallet`      | Wallet creation, balance, deposits, withdrawals   |
| **Transaction** | `/transaction` | Transaction history, transfers                    |

## 📌 Role-Based Access

| Role      | Permissions                                                       |
| --------- | ----------------------------------------------------------------- |
| **User**  | send money, cash out, update own, view own history                |
| **Agent** | Cash-in, cash-out for users, view commission history              |
| **Admin** | Manage users/agents, block/unblock wallets, view all transactions |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/adnanakhlasofficial/digital-wallet-server

cd digital-wallet-server
```

### 2️⃣ Install dependencies

```bash
pnpm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital_wallet
NODE_ENV=YOUR_NODE_ENV
JWT_ACCESS_SECRET=YOUR_JWT_ACCESS_SECRET
JWT_REFRESH_SECRET=YOUR_JWT_REFRESH_SECRET
BCRYPT_SALT=YOUR_BCRYPT_SALT
ADMIN_PHONE=YOUR_ADMIN_PHONE
ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD

```

### 4️⃣ Run the server

```bash
pnpm dev
```

Server will start at:

```
http://localhost:5000
```

---

## 📜 Example API Endpoints

### **Auth**

- `POST /auth/register` → Register new user/agent
- `POST /auth/login` → Login and get JWT
- `POST /auth/logout` → Logout and remove JWT

### **Wallet**

- `POST /wallet/all-wallets` → View all wallets (admin only)
- `POST /wallet/block` → Block wallet (admin only)
- `POST /wallet/unblock` → Unblock wallet (admin only)

### **Transaction**

- `GET /transaction/me` → View own transaction history
- `GET /transaction/all-transactions` → View all transactions (admin only)
- `GET /transaction/send-money` → Send money (User to User)
- `GET /transaction/cash-out` → Send Money (User to Agent)
- `GET /transaction/cash-in` → Send Money (Agent to User)
- `GET /transaction/cash-in` → Send Money (Agent to User)
- `GET /transaction/approve` → Approve pending transaction
- `GET /transaction/reverse` → Reversed pending transaction

---

## 🧪 Testing

- Import the **Postman Collection** from: [Postman Docs](https://your-postman-doc-link.com)
- Test endpoints with role-based JWT tokens
- Ensure proper status codes and error handling

---

## 🛡 Security

- Passwords hashed with **bcryptjs**
- JWT tokens signed with **secret key**
- Role-based middleware for route protection
- Zod validation for request payloads

---
