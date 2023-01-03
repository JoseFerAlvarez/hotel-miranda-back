import { connect } from "../db/connection";
import { User } from "../Schemas/schuser";
import { getHashPass } from "../helpers/helpers";

import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { IntUser } from "../interfaces/interfaces";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;


/* Login with user and password */
passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email: string, password: string, done) => {
            connect(null);

            try {

                const pass: string = await getHashPass(password);

                const query = User.findOne({ "email": email, "pass": pass });

                await query.exec((err: Error, user: IntUser) => {

                    if (err || !user) {
                        if (email === process.env.DEFAULT_USER && password === process.env.DEFAULT_PASSWORD) {
                            const user = {
                                _id: 1,
                                email: process.env.DEFAULT_USER,
                            }
                            return done(null, user, { message: "Logged in successfully" });
                        } else {
                            return done(null, false, { message: "Invalid credentials" });
                        }
                    } else {
                        return done(null, { _id: user._id, email: user.email }, { message: "Logged in successfully" });
                    }
                });
            } catch (error) {
                return done(error);
            }
        })
)

/* Login with header token */
passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.SECRET_TOKEN,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        })
);
