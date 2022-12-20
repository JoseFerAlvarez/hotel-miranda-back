import express from "express";
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Users');
});

/* POST a new user. */
router.post("/", (req, res) => {
  res.send("User post");
});

/* PUT an existing user. */
router.put("/user", (req, res) => {
  res.send("User put");
})

/* DELETE an existing user. */
router.delete("/user", (req, res) => {
  res.send("User delete");
});

module.exports = router;
