import React from "react";

const RecipeList = ({ recipes }) => {
  return (
    <>
      <div className="recipe-list">
        <h1>Recipes</h1>
        <div className="card-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.uri}>
            <h3>{recipe.label}</h3>
            <img src={recipe.image} alt={recipe.label} />
            <p>
              <a href={recipe.url}>View Recipe</a>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipeList;
