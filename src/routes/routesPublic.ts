import express from "express";
import { loginAuth } from "../controllers/loginController";

const routerPublic = express.Router();
/** Login */
routerPublic.post("/login", loginAuth);

export default routerPublic;
