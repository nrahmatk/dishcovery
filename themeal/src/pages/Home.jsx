import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import recipeSlice, { fetchRecipes } from "../store/slicers/recipeSlice";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error, totalResults, currentPage } = useSelector(
    (state) => state.recipes
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchRecipes({ query, page: 1 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchRecipes({ query, page: newPage }));
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  if (error) return <div className="recipe-list">Error: {error}</div>;

  const totalPages = Math.ceil(totalResults / 9);
  const pagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  console.log(recipes);

  return (
    <>
      <Hero setQuery={setQuery} />
      <div className="recipe-list">
        <h1>Recipes</h1>
        <div className="card-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pages.map((page) => (
            <button
              key={page}
              disabled={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
