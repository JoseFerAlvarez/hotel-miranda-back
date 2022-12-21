import express from "express";

const routerUsers = express.Router();

/** Users */
/* GET users listing. */
routerUsers.get('/users', (req, res) => {
    res.send('Users');
});
/* GET user */
routerUsers.get("/users/:iduser", (req, res) => {
    res.send("User get");
})

/* POST a new user. */
routerUsers.post("/users", (req, res) => {
    res.send("User post");
});

/* PUT an existing user. */
routerUsers.put("/users/:iduser", (req, res) => {
    res.send("User put");
})

/* DELETE an existing user. */
routerUsers.delete("/users/:iduser", (req, res) => {
    res.send("User delete");
});

export { routerUsers };
