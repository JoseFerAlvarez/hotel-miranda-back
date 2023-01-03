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
const connection_1 = require("../db/connection");
const schuser_1 = require("../Schemas/schuser");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const LocalStrategy = passport_local_1.default.Strategy;
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
/* Login with user and password */
passport_1.default.use("login", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connection_1.connect)(null);
    try {
        const pass = yield getHashPass(password);
        const query = schuser_1.User.findOne({ "email": email, "pass": pass });
        yield query.exec((err, user) => {
            if (err) {
                if (email === "josefer@gmail.com" && password === "1234") {
                    const user = {
                        _id: 1,
                        email: "josefer@gmail.com",
                    };
                    return done(null, user, { message: "Logged in successfully" });
                }
                else {
                    return done(null, false, { message: "Invalid credentials" });
                }
            }
            return done(null, { _id: user._id, email: user.email }, { message: "Logged in successfully" });
        });
        if (email === "josefer@gmail.com" && password === "1234") {
            const user = {
                _id: 1,
                email: "josefer@gmail.com",
            };
            return done(null, user, { message: "Logged in successfully" });
        }
        else {
            return done(null, false, { message: "Invalid credentials" });
        }
    }
    catch (error) {
        return done(error);
    }
})));
/* Login with header token */
passport_1.default.use(new JwtStrategy({
    secretOrKey: "TOP_SECRET",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
})));
/** Function helper to get the hash password */
function getHashPass(pass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(pass, 10)
            .then((result) => result);
    });
}
//# sourceMappingURL=auth.js.map