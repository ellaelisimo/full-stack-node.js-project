import express from "express";
import cors from "cors";
import Joi from "joi";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../config.js";
import bodyParser from "body-parser";

const router = express.Router();
export const adminSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
});

router.use(bodyParser.json());

router.post("/admin-registration", async (req, res) => {
  let adminData = req.body;
  console.log(adminData);
  try {
    adminData = await adminSchema.validateAsync(adminData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: `Incorrect data sent` }).end();
  }
  try {
    const hashedPassword = bcrypt.hashSync(adminData.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [data] = await con.execute(`INSERT INTO admin (name, password) 
    VALUES (${mysql.escape(adminData.name)}, "${hashedPassword}")`);

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
