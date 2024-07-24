const { SavedRecipe } = require('../models');

const checkFavorite = async (req, res, next) => {
    try {
        const {RecipeId} = req.body;
        const UserId = req.user.id;          

        const favorite = await SavedRecipe.findOne({ where: { UserId, RecipeId } });

        if (favorite) {
            throw {name: "ALREADY_FAV"}
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = checkFavorite;
