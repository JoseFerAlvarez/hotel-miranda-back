"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET contacts listing. */
router.get("/", (req, res) => {
    res.send("Contacts");
});
/* POST a new contact. */
router.post("/", (req, res) => {
    res.send("Contact post");
});
/* PUT an existing contact. */
router.put(("/contact"), (req, res) => {
    res.send("Contact put");
});
/* DELETE an existing contact. */
router.delete(("/contact"), (req, res) => {
    res.send("Contact delete");
});
module.exports = router;
//# sourceMappingURL=contacts.js.map