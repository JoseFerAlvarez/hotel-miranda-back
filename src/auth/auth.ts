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
            try {
                if (email === "josefer@gmail.com" && password === "1234") {
                    const user = {
                        _id: 1,
                        email: "josefer@gmail.com",
                    }
                    return done(null, user, { message: "Logged in successfully" });
                } else {
                    return done(null, false, { message: "Invalid credentials" });
                }
            } catch (error) {
                return done(error);
            }
        })
)

/* Login with header token */
passport.use(
    new JwtStrategy(
        {
            secretOrKey: "TOP_SECRET",
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
