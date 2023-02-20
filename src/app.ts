import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";
import cors from "cors";

import * as dotenv from "dotenv";
dotenv.config();

import {
    routerPublic,
    routerRooms,
    routerUsers,
    routerBookings,
    routerContacts
} from "./routes/routes";

import("./auth/auth");

const app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', routerPublic);
app.use('/rooms', passport.authenticate("jwt", { session: false }), routerRooms);
app.use('/users', passport.authenticate("jwt", { session: false }), routerUsers);
app.use('/bookings', passport.authenticate("jwt", { session: false }), routerBookings);
app.use('/contacts', passport.authenticate("jwt", { session: false }), routerContacts);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
})

//error handler
app.use((err, req, res, next) => {
    res.status(404).send({ error: err.message })
    res.status(500).send({ error: err.message })
})

export default app;
