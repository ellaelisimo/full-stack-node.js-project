import express from "express";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "./config.js";

const router = express.Router();

router.get("/events", async (req, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [data] = await con.execute(`SELECT * FROM events`);

    await con.end();
    res.send(data);
  } catch (error) {
    console.error(error);
    return res.status(401).send(error).end();
  }
});

router.get("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const event = `select * from events where id = ${eventId}`;

    const result = await con.execute(event);

    res.send(result[0]).end();
  } catch (error) {
    res.status(500).send(console.error({ error })).end();
  }
});

router.get("/events-with-participants", async (req, res) => {
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const events = (await con.execute("select * from `events`"))[0];

    const eventsWithParticipants = await Promise.all(
      events.map(async (event) => {
        const participants = await con.execute(
          `select users.id, name, surname, email, DATE_FORMAT(date_of_birth, '%Y-%m-%d') as date_of_birth, TIMESTAMPDIFF(YEAR,date_of_birth,CURDATE()) as age, 
            event_participants.date_of_registration from users inner join event_participants on users.id = event_participants.user_id where event_participants.event_id = ${event.id}`
        );
        return { ...event, participants: participants[0] };
      })
    );

    res.send(eventsWithParticipants).end();
  } catch (error) {
    res.status(500).send(console.error({ error })).end();
  }
});

export default router;
