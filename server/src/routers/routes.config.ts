const express = require("express");
const router = express.Router();
import login from "../controllers/authorization";
import minimumPermissionLevelRequired from "../middlewares/permission";
import validJWTNeeded from "../middlewares/auth.validation";
import isPasswordAndUserMatch from "../middlewares/verify.user";
const UsersController = require("../controllers/users");
import { createPost, getAllPost } from "../controllers/posts";

import { like, likePost } from "../controllers/likes";

router.get("/user", [UsersController.findAll]);
router.post("/signup", [UsersController.createUser]);
router.get("/user/:id", [UsersController.findUserById]);

router.post("/login", [
  validJWTNeeded,
  minimumPermissionLevelRequired(1),
  login,
]);

router.post("/auth", [isPasswordAndUserMatch, login]);

router.get("/post", [getAllPost]);
router.post("/post", [createPost]);

router.post("/post/like", [like]);
router.get("/post/like/:postId", [likePost]);

module.exports = router;
