const express = require("express");
const router = express.Router();
const userControlller = require("../controller/userController");

router.post("/signup", userControlller.singUpUser);

router.get("/signin", userControlller.singInUser);

router.get("/current", userControlller.currentUser);

module.exports = router;
