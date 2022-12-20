"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
module.exports = router;
//# sourceMappingURL=users.js.map