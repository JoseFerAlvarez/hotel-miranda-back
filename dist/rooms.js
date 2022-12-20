"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET rooms listing. */
router.get("/", (req, res) => {
    res.send("Rooms");
});
/* POST a new room. */
router.post("/", (req, res) => {
    res.send("Room post");
});
/* PUT an existing room. */
router.put("/room", (req, res) => {
    res.send("Room put");
});
/* DELETE an existing user. */
router.delete("/room", (req, res) => {
    res.send("Room deleted");
});
module.exports = router;
//# sourceMappingURL=rooms.js.map