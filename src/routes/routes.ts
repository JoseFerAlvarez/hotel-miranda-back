import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
    "/login",
    async (req: any, res, next) => {
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
                        async (error) => {
                            if (error) return next(error);

                            const body = { _id: user.id, email: user.email };
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

/** Rooms */
/* GET rooms listing. */
router.get("/rooms", (req, res) => {
    res.send("Rooms get");
})

/* GET room */
router.get(("/rooms/:idroom"), (req, res) => {
    res.send("Room get");
});

/* POST a new room. */
router.post("/rooms", (req, res) => {
    res.send("Room post");
})

/* PUT an existing room. */
router.put("/room/:idroom", (req, res) => {
    res.send("Room put");
})

/* DELETE an existing room. */
router.delete("/room/:idroom", (req, res) => {
    res.send("Room deleted")
})


/** Users */
/* GET users listing. */
router.get('/users', (req, res) => {
    res.send('Users');
});
/* GET user */
router.get("/users/:iduser", (req, res) => {
    res.send("User get");
})

/* POST a new user. */
router.post("/users", (req, res) => {
    res.send("User post");
});

/* PUT an existing user. */
router.put("/users/:iduser", (req, res) => {
    res.send("User put");
})

/* DELETE an existing user. */
router.delete("/users/:iduser", (req, res) => {
    res.send("User delete");
});


/** Bookings */
/* GET bookings listing. */
router.get("/bookings", (req, res) => {
    res.send("Bookings");
})

/* GET booking */
router.get(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking get");
})

/* POST a new booking. */
router.post(("/bookings"), (req, res) => {
    res.send("Booking post");
});

/* PUT an existing booking. */
router.put(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking put");
});

/* DELETE an existing booking. */
router.delete(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking delete");
});


/** Contacts */
/* GET contacts listing. */
router.get("/contacts", (req, res) => {
    res.send("Contacts");
})

/* GET Contact */
router.get(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact get");
})

/* POST a new contact. */
router.post("/contacts", (req, res) => {
    res.send("Contact post");
});

/* PUT an existing contact. */
router.put(("/contact/:idcontact"), (req, res) => {
    res.send("Contact put");
})

/* DELETE an existing contact. */
router.delete(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact delete");
});

export default router;
