import express from "express";
import cors from "cors";
import { PORT } from "./src/config.js";
import dotenv from "dotenv";
import login from "./src/admin-login/login.js";
import accountsAuth from "./src/admin-login/accountsAuth.js";
import registration from "./src/admin-login/registration.js";
import users from "./src/users.js";
import events from "./src/events.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(login);
app.use(accountsAuth);
app.use(registration);
app.use(users);
app.use(events);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
