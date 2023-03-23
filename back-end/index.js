import express from "express";
import cors from "cors";
import { PORT } from "./auth/config.js";
import dotenv from "dotenv";
import login from "./auth/login.js";
import accountsAuth from "./auth/accountsAuth.js";
import registration from "./auth/registration.js";
import { MYSQL_CONFIG } from "./auth/config.js";
import mysql from "mysql2/promise";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(login);
app.use(accountsAuth);
app.use(registration);

app.get("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const users = `SELECT * FROM users`;

    const result = await con.execute(users);

    res.send(result[0]).end();
  } catch (error) {
    res.status(500).send(console.error({ error })).end();
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
