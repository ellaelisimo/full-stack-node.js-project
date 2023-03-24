import express from "express";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "./config.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const users = `select id, name, surname, email, DATE_FORMAT(date_of_birth, '%Y-%m-%d') as date_of_birth, TIMESTAMPDIFF(YEAR,date_of_birth,CURDATE()) as age from users`;

    const result = await con.execute(users);

    res.send(result[0]).end();
  } catch (error) {
    res.status(500).send(console.error({ error })).end();
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const user = `select id, name, surname, email, DATE_FORMAT(date_of_birth, '%Y-%m-%d') as date_of_birth, TIMESTAMPDIFF(YEAR,date_of_birth,CURDATE()) as age from users where id = ${userId}`;

    const result = await con.execute(user);

    res.send(result[0]).end();
  } catch (error) {
    res.status(500).send(console.error({ error })).end();
  }
});

router.post("/users", async (req, res) => {
  const { name, surname, email, date_of_birth } = req.body;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    await con.execute(
      `INSERT INTO users (name, surname, email, date_of_birth) VALUES (${name}, ${surname}, ${email}, ${date_of_birth})`
    );

    await con.end();

    res.status(201).send({ message: "User created" }).end();
  } catch (error) {
    res.status(500).send(console.error({ error })).end();
  }
});

export default router;
