const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const SavedRecipeController = require("../controllers/savedRecipeController");
const authentication = require("../middleware/authentication");
const ChatController = require("../controllers/chatController");
const checkFavorite = require("../middleware/checkfav");
const Supporter = require("../controllers/supporter");
const checkStatus = require("../middleware/checkStatus");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/google-signin", AuthController.googleSignIn);

router.post("/chat", authentication, checkStatus, ChatController.chat);

router.post("/update-supporter-status", authentication, Supporter.Support)

router.post("/save-recipe", authentication, checkFavorite, SavedRecipeController.saveRecipe);
router.get("/save-recipe", authentication, SavedRecipeController.getSavedRecipes);
router.delete("/save-recipe/:favid", authentication, SavedRecipeController.deleteSaveRecipe);

module.exports = router;
