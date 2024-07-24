import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../store/slicers/recipeSlice';
import RecipeCard from '../components/RecipeCard';
import './Recipes.css';

const cuisines = [
    'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 
    'Spanish', 'Thai', 'Vietnamese'
];

const diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Vegan', 'Pescetarian', 'Paleo'];
const mealTypes = [
    'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread',
    'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'
];
const maxReadyTimes = [
    '5-10 minutes', '11-20 minutes', '21-30 minutes', '31-40 minutes', 
    '41-50 minutes', '51-60 minutes', 'above 1 hour'
];

const Recipes = () => {
    const dispatch = useDispatch();
    const { recipes, loading, error, totalResults, currentPage } = useSelector((state) => state.recipes);
    const [localFilters, setLocalFilters] = useState({
        query: '',
        cuisine: '',
        diet: '',
        mealType: '',
        maxReadyTime: '',
        includeIngredients: '',
        calories: ''
    });
    const [appliedFilters, setAppliedFilters] = useState({
        query: '',
        cuisine: '',
        diet: '',
        mealType: '',
        maxReadyTime: '',
        includeIngredients: '',
        calories: ''
    });

    useEffect(() => {
        dispatch(fetchRecipes({ ...appliedFilters, page: 1 }));
    }, [dispatch, appliedFilters]);

    const handlePageChange = (newPage) => {
        dispatch(fetchRecipes({ ...appliedFilters, page: newPage }));
    };

    const handleFilterChange = (e) => {
        setLocalFilters({
            ...localFilters,
            [e.target.name]: e.target.value
        });
    };

    const handleClearFilters = () => {
        setLocalFilters({
            query: '',
            cuisine: '',
            diet: '',
            mealType: '',
            maxReadyTime: '',
            includeIngredients: '',
            calories: ''
        });
        setAppliedFilters({
            query: '',
            cuisine: '',
            diet: '',
            mealType: '',
            maxReadyTime: '',
            includeIngredients: '',
            calories: ''
        });
    };

    const handleApplyFilters = () => {
        setAppliedFilters({ ...localFilters });
    };

    const totalPages = Math.ceil(totalResults / 9);
    const pagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="recipes-page">
            <div className="sidebar">
                <div className="filter-group">
                    <label>Search</label>
                    <input 
                        type="text" 
                        name="query" 
                        value={localFilters.query} 
                        onChange={handleFilterChange} 
                        placeholder="Search for recipes..."
                    />
                </div>
                <h3>Filter by</h3>
                <div className="filter-group">
                    <label>Cuisine</label>
                    <select name="cuisine" value={localFilters.cuisine} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {cuisines.map(cuisine => (
                            <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Diet</label>
                    <select name="diet" value={localFilters.diet} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {diets.map(diet => (
                            <option key={diet} value={diet}>{diet}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Meal Type</label>
                    <select name="mealType" value={localFilters.mealType} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {mealTypes.map(mealType => (
                            <option key={mealType} value={mealType}>{mealType}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Max Ready Time</label>
                    <select name="maxReadyTime" value={localFilters.maxReadyTime} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {maxReadyTimes.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Include Ingredients</label>
                    <input 
                        type="text" 
                        name="includeIngredients" 
                        value={localFilters.includeIngredients} 
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-group">
                    <label>Max Calories</label>
                    <input 
                        type="number" 
                        name="calories" 
                        value={localFilters.calories} 
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="filter-buttons">
                    <button onClick={handleClearFilters}>Clear</button>
                    <button onClick={handleApplyFilters}>Apply</button>
                </div>
            </div>
            <div className="recipe-list">
                <h1>Recipes</h1>
                <div className="card-list">
                    {loading && (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                    {error && <div className="recipe-list">Error: {error}</div>}
                    {!loading && !error && recipes.map((recipe) => (
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
        </div>
    );
};

export default Recipes;
