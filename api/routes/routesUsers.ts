import express from "express";
import {
    userDelete,
    userDetail,
    userList,
    userPost,
    userPut
} from "../controllers/usersController";

const routerUsers = express.Router();

/* GET users listing. */
routerUsers.get('/', userList);

/* GET user */
routerUsers.get('/:iduser', userDetail)

/* POST a new user. */
routerUsers.post('/', userPost);

/* PUT an existing user. */
routerUsers.put('/:iduser', userPut)

/* DELETE an existing user. */
routerUsers.delete('/:iduser', userDelete);

export default routerUsers;
