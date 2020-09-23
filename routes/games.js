const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");

router.get("/favoriteGames/:userToken",gamesController.getFavoriteGames)
router.post("/favoriteGames", gamesController.postFavoriteGames);


module.exports = router;
