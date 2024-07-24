// src/components/FavoriteItem.js
import React from "react";
import { Link } from "react-router-dom";

const FavoriteItem = ({ favorite, onRemove }) => {
  return (
    <div className="recipe-card">
      <img src={favorite.image} alt={favorite.title} />
      <h3>{favorite.title}</h3>
      <Link to={`/recipe/${favorite.RecipeId}`}>View Details</Link>
      <button onClick={() => onRemove(favorite.id)} className="full" >
        Remove
      </button>
    </div>
  );
};

export default FavoriteItem;
