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
  const { name, surname, email, date_of_birth, event_ids } = req.body;

  if (
    !name ||
    !surname ||
    !email ||
    !date_of_birth ||
    event_ids === undefined
  ) {
    return res
      .status(400)
      .send({
        error: "name, surname, email, date_of_birth and event_ids are required",
      })
      .end();
  }

  if (
    !Array.isArray(event_ids) ||
    event_ids.some((id) => typeof id !== "number")
  ) {
    return res
      .status(400)
      .send({
        error: "event_ids should be an array of numbers",
      })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [addedUser] = await con.execute(
      "INSERT INTO users (name, surname, email, date_of_birth) VALUES (?, ?, ?, ?)",
      [name, surname, email, date_of_birth]
    );

    event_ids.map(async (event_id) => {
      await con.execute(
        "INSERT INTO event_participants (user_id, event_id, date_of_registration) VALUES (?, ?, NOW())",
        [addedUser.insertId, event_id]
      );
    });

    await con.end();

    res.status(201).send({ message: "User created" }).end();
  } catch (error) {
    res.status(500).send(console.error({ error })).end();
  }
});

export default router;
