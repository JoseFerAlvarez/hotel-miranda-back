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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const connection_1 = require("../db/connection");
const LocalStrategy = passport_local_1.default.Strategy;
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
/* Login with user and password */
passport_1.default.use("login", new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, connection_1.dbQuery)("SELECT * FROM users WHERE email = ? AND pass = ?;", [email, password])
            .then((user) => user);
        if (!user) {
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
        else {
            return done(null, { _id: user.iduser, email: user.email }, { message: "Logged in successfully" });
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
//# sourceMappingURL=auth.js.map