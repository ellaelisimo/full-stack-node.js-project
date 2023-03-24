import express from "express";
import cors from "cors";
import { PORT } from "./src/config.js";
import dotenv from "dotenv";
import login from "./src/admin-login/login.js";
import accountsAuth from "./src/admin-login/accountsAuth.js";
import usersRegistration from "./src/usersRegistration.js";
import users from "./src/users.js";
import events from "./src/events.js";
import adminRegistration from "./src/admin-login/adminRegistration.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(login);
app.use(accountsAuth);
app.use(usersRegistration);
app.use(users);
app.use(events);
app.use(adminRegistration);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
