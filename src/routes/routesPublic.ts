import express from "express";
import { loginAuth } from "../controllers/loginController";

const routerPublic = express.Router();
/** Login */
routerPublic.post("/", loginAuth);

export default routerPublic;
