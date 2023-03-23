import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG, jwt_Secret } from "./config.js";
import jwt from "jsonwebtoken";
import { userSchema } from "./registration.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  let userData = req.body;

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Incorrect data send" }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [data] = await con.execute(
      `SELECT * FROM users WHERE email = ${mysql.escape(userData.email)}`
    );

    await con.end();

    if (!data.length) {
      return res
        .status(400)
        .send({ message: "Please provide a valid email or password" })
        .end();
    }
    const isAuthed = bcrypt.compareSync(userData.password, data[0].password);

    if (isAuthed) {
      const token = jwt.sign(
        {
          id: data[0].id,
          email: data[0].email,
        },
        jwt_Secret
      );
      return res.send({ msg: `Succesfully logged in ${token}` }).end();
    }
    return res.status(403).send({ error: "Invalid credentials" }).end();
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ error: "There was error with your login information" })
      .end();
  }
});
export default router;
