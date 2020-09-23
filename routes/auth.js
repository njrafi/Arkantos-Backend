const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/login", authController.postLogin);
router.post("/updateUser", authController.updateUser);

module.exports = router;
