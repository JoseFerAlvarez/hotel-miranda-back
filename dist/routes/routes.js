"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error("An error ocurred.");
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user.id, email: user.email };
                const token = jsonwebtoken_1.default.sign({ user: body }, "TOP_SECRET");
                return res.json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
}));
/** Rooms */
/* GET rooms listing. */
router.get("/rooms", (req, res) => {
    res.send("Rooms get");
});
/* GET room */
router.get(("/rooms/:idroom"), (req, res) => {
    res.send("Room get" + req.params.idroom);
});
/* POST a new room. */
router.post("/rooms", (req, res) => {
    res.send("Room post");
});
/* PUT an existing room. */
router.put("/room/:idroom", (req, res) => {
    res.send("Room put");
});
/* DELETE an existing room. */
router.delete("/room/:idroom", (req, res) => {
    res.send("Room deleted");
});
/** Users */
/* GET users listing. */
router.get('/users', (req, res) => {
    res.send('Users');
});
/* GET user */
router.get("/users/:iduser", (req, res) => {
    res.send("User get");
});
/* POST a new user. */
router.post("/users", (req, res) => {
    res.send("User post");
});
/* PUT an existing user. */
router.put("/users/:iduser", (req, res) => {
    res.send("User put");
});
/* DELETE an existing user. */
router.delete("/users/:iduser", (req, res) => {
    res.send("User delete");
});
/** Bookings */
/* GET bookings listing. */
router.get("/bookings", (req, res) => {
    res.send("Bookings");
});
/* GET booking */
router.get(("/bookings/:idbooking"), (req, res) => {
    res.send("Booking get");
});
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
});
/* GET Contact */
router.get(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact get");
});
/* POST a new contact. */
router.post("/contacts", (req, res) => {
    res.send("Contact post");
});
/* PUT an existing contact. */
router.put(("/contact/:idcontact"), (req, res) => {
    res.send("Contact put");
});
/* DELETE an existing contact. */
router.delete(("/contacts/:idcontact"), (req, res) => {
    res.send("Contact delete");
});
exports.default = router;
//# sourceMappingURL=routes.js.map