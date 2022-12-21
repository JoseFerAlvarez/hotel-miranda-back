import express from "express";
const routerRooms = express.Router();

/** Rooms */
/* GET rooms listing. */
routerRooms.get("/rooms", (req, res) => {
    res.send("Rooms get");
})

/* GET room */
routerRooms.get(("/rooms/:idroom"), (req, res) => {
    res.send("Room get");
});

/* POST a new room. */
routerRooms.post("/rooms", (req, res) => {
    res.send("Room post");
})

/* PUT an existing room. */
routerRooms.put("/room/:idroom", (req, res) => {
    res.send("Room put");
})

/* DELETE an existing room. */
routerRooms.delete("/room/:idroom", (req, res) => {
    res.send("Room deleted")
})


/** Users */
/* GET users listing. */
routerRooms.get('/users', (req, res) => {
    res.send('Users');
});
/* GET user */
routerRooms.get("/users/:iduser", (req, res) => {
    res.send("User get");
})

export { routerRooms };
