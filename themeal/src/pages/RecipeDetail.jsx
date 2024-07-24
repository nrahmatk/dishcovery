import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecipeDetail.css";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../store/slicers/userSlice";
import { addFavorite, fetchFavorites } from "../store/slicers/favoriteSlice"; // Import action dari favoriteSlice

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: "e48d7514a07b4f6fbdaf6d720bb76554",
            },
          }
        );
        setRecipeDetail(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  const handleAddFavorite = async () => {
    try {
      await dispatch(addFavorite(recipeDetail)).unwrap(); // Panggil action addFavorite
      Swal.fire({
        title: "Success!",
        text: "Recipe saved to favorites.",
        icon: "success",
        confirmButtonColor: "#E38B29",

      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#E38B29",

      });
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  if (error)
    return (
      <>
        <div className="recipe-detail">Error: {error}</div>
      </>
    );
  if (!recipeDetail) return null;

  return (
    <>
      <div className="recipe-main">
        <div className="recipe-detail">
          <h1>{recipeDetail.title}</h1>
          <img src={recipeDetail.image} alt={recipeDetail.title} />

          <div className="info">
            <button onClick={handleAddFavorite} className="full">
              Add to Favorites
            </button>
            <h2>Recipe Information</h2>
            <p>Ready in {recipeDetail.readyInMinutes} minutes</p>
            <p>Servings: {recipeDetail.servings}</p>
            <p>Score: {recipeDetail.spoonacularScore}</p>
            <a
              href={recipeDetail.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Recipe
            </a>
          </div>

          <div className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipeDetail.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          <div className="instructions">
            <h2>Instructions</h2>
            <ol>
              {recipeDetail.analyzedInstructions.length > 0 &&
                recipeDetail.analyzedInstructions[0].steps.map(
                  (step, index) => <li key={step.number}>{step.step}</li>
                )}
            </ol>
          </div>

          <div
            className="summary"
            dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
          />
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
