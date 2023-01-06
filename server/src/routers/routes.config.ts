const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");

router.get("/", [UsersController.findAll]);
router.post("/register", [UsersController.createUser]);
router.get("/:id", [UsersController.findUserById]);

module.exports = router;
