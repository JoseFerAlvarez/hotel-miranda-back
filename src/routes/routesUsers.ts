import express from "express";
import {
    user_delete,
    user_detail,
    user_list,
    user_post,
    user_put
} from "../controllers/usersController";

const routerUsers = express.Router();

/* GET users listing. */
routerUsers.get('/users', user_list);

/* GET user */
routerUsers.get("/users/:iduser", user_detail)

/* POST a new user. */
routerUsers.post("/users", user_post);

/* PUT an existing user. */
routerUsers.put("/users/:iduser", user_put)

/* DELETE an existing user. */
routerUsers.delete("/users/:iduser", user_delete);

export { routerUsers };
