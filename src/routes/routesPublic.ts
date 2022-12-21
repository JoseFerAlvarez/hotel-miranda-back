import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const routerPublic = express.Router();
/** Login */
routerPublic.post(
    "/login",
    async (req: any, res, next) => {
        passport.authenticate(
            "login",
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        res.send("hola " + user)
                        const error = new Error("An error ocurred.");

                        return next(error);
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, "TOP_SECRET");

                            return res.json({ token });
                        });
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);




export { routerPublic };
