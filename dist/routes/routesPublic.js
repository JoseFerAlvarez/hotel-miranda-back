"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controllers/loginController");
const routerPublic = express_1.default.Router();
routerPublic.post("/login", loginController_1.loginAuth);
exports.default = routerPublic;
