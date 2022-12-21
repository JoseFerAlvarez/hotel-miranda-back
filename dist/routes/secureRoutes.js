"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureRouter = void 0;
const express_1 = __importDefault(require("express"));
const secureRouter = express_1.default.Router();
exports.secureRouter = secureRouter;
secureRouter.get("/prueba", (req, res, next) => {
    res.send("Rooms get");
});
//# sourceMappingURL=secureRoutes.js.map