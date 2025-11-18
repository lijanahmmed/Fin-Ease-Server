# Fin Ease Server

**Fin Ease Server** is the backend API for the Fin Ease personal finance management application.  
It provides secure user authentication, transaction management, data validation, and communication with the MongoDB database.  
Built using **Node.js**, **Express.js**, and **MongoDB**, this server powers all financial operations for the Fin Ease frontend.

---

## Features

- **CRUD Operations for Transactions**
- **Income & Expense Categorization**
- **MongoDB Database Integration**
- **Error Handling & Validation**
- **CORS Enabled for Client Communication**

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **dotenv**
- **Cors**

---

## 📦 Dependencies

```json
{
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "firebase-admin": "^13.6.0",
  "mongodb": "^7.0.0",
  "nodemon": "^3.1.10"
}
```

## Links

- **Client Repository:**  
  https://github.com/lijanahmmed/Fin-Ease-Client

- **Live Website:**  
  https://fin-ease-spa-web.netlify.app/

- **Server Deploy Link:**  
  https://fin-ease-server-nine.vercel.app/

---

## Clone the Repository

Use the following command to clone the project:

```bash
git clone https://github.com/lijanahmmed/Fin-Ease-Server.git

cd Fin-Ease-Server
```

### Install Dependencies

```bash
cd Fin-Ease-Server
npm install

```

### Start Backend

```bash
nodemon index.js
```
