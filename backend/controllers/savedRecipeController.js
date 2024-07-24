const { SavedRecipe } = require("../models");

class SavedRecipeController {
  static async saveRecipe(req, res, next) {
    const {RecipeId, title, image} = req.body
    const UserId = req.user.id;  
    try {
      const savedRecipe = await SavedRecipe.create({
        UserId,
        RecipeId, 
        title, 
        image
      });
      res
        .status(201)
        .json({ message: "Recipe saved successfully", savedRecipe });
    } catch (error) {
      next();
    }
  }

  static async getSavedRecipes(req, res, next) {
    const UserId = req.user.id;
    try {
      const savedRecipes = await SavedRecipe.findAll({ where: { UserId } });
      res.json(savedRecipes);
    } catch (error) {
      next();
    }
  }

  static async deleteSaveRecipe(req, res, next) {
    try {
      const {favid} = req.params
      const savedRecipes = await SavedRecipe.destroy({ where: { id: favid } });
      res.json(savedRecipes);
    } catch (error) {
      next();
    }
  }
}

module.exports = SavedRecipeController;
