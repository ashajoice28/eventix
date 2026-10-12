const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { listFavorites, addFavorite, removeFavorite } = require("../controllers/favoriteController");
router.use(protect);
router.get("/", listFavorites);
router.post("/:eventId", addFavorite);
router.delete("/:eventId", removeFavorite);
module.exports = router;
