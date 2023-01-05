const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");

router.get("/", [UsersController.findAll]);

module.exports = router;
