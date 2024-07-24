import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/slicers/recipeSlice';
import './Hero.css';

export default function Hero({ setQuery }) {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        setQuery(input);
        dispatch(fetchRecipes({ query: input, page: 1 })); // Always start from the first page on new search
    };

    return (
        <div className="hero">
            <div className="hero-content">
                <h1>Welcome to Recipe Discovery</h1>
                <p>Discover delicious recipes and nutritional tips</p>
                <div className="hero-input-form">
                    <input 
                        type="text" 
                        placeholder="Search for recipes or tips..." 
                        aria-label="Search" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handleSearch}>Go</button>
                </div>
            </div>
        </div>
    );
}
