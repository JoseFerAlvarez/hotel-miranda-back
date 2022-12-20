import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

const localStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

/* Login with user and password */
passport.use(
    "login",
    new localStrategy({
        usernameField: "email",
        passwordField: "password"
    },
        async (email, password, done) => {
            try {
                /* const user = await UserModel.findOne({email}); */
                const user = "";

                /* const validate = await user.isValidPassword(password); */
                let validate = "";

                !user ? validate = "" : validate = "";


                if (!user || !validate) {
                    return done(null, false, { message: "Invalid credentials" });
                }

                return done(null, user, { message: "Logged in successfully" });
            } catch (error) {
                return done(error);
            }
        })
)

/* Login with header token */
passport.use(
    new JwtStrategy(
        {
            secretOrKey: "secret",
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
