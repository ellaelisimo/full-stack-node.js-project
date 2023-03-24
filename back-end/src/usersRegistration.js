import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "./config.js";

const router = express.Router();

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  surname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().trim().lowercase().required(),
  date_of_birth: Joi.date().required(),
});

router.post("/user-registration", async (req, res) => {
  let userData = req.body;
  console.log(userData);
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: `Incorrect data sent` }).end();
  }
  try {
    const hashedPassword = bcrypt.hashSync(userData.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [data] = await con.execute(`INSERT INTO users (email, password) 
      VALUES (${mysql.escape(userData.email)}, "${hashedPassword}")`);

    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Unexpected error: Please try again` })
      .end();
  }
});

export default router;
