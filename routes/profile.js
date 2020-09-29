const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");

router.post("/update", profileController.update)

module.exports = router;
