import express from "express";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG, jwt_Secret } from "../config.js";
import jwt from "jsonwebtoken";
import { adminSchema } from "./adminRegistration.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  let adminData = req.body;

  try {
    adminData = await adminSchema.validateAsync(adminData);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Incorrect data send" }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const [data] = await con.execute(
      `SELECT * FROM admin WHERE name = ${mysql.escape(adminData.name)}`
    );

    await con.end();

    if (!data.length) {
      return res
        .status(400)
        .send({ message: "Please provide a valid email or password" })
        .end();
    }
    const isAuthed = bcrypt.compareSync(adminData.password, data[0].password);

    if (isAuthed) {
      const token = jwt.sign(
        {
          id: data[0].id,
          name: data[0].name,
        },
        jwt_Secret
      );
      return res.send({ msg: `Succesfully logged in`, token: token }).end();
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
