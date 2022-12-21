"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPrueba = void 0;
const express_1 = __importDefault(require("express"));
const routerPrueba = express_1.default.Router();
exports.routerPrueba = routerPrueba;
routerPrueba.get("/prueba", (req, res, next) => {
    res.send("prueba funcionando");
});
//# sourceMappingURL=secureRoute.js.map