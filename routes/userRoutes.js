const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenJsonHandler");
const userControlller = require("../controller/userController");

router.post("/signup", userControlller.singUpUser);

router.post("/signin", userControlller.singInUser);

router.get("/current", validateToken,userControlller.currentUser);
router.get("/alluser", userControlller.getAllUser);

module.exports = router;
