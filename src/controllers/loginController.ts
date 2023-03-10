import passport from "passport";
import jwt from "jsonwebtoken";

const loginAuth = async (req, res, next) => {
    passport.authenticate(
        "login",
        async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error("An error ocurred.");

                    return next(error);
                }

                req.login(
                    user,
                    { session: false },
                    async (error: Error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN);

                        return res.json({ token });
                    });
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
}

export { loginAuth };
