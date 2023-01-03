import { connect } from "../db/connection";
import { User } from "../Schemas/schuser";
import bcrypt from "bcrypt";

import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

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
        async (email, password, done) => {
            connect(null);

            try {

                const pass = await getHashPass(password);

                const query = User.findOne({ "email": email, "pass": pass });

                await query.exec((err, user) => {

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

/** Function helper to get the hash password */
async function getHashPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, 10)
        .then((result) => result);
}
