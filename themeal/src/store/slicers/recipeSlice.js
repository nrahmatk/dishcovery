import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    recipes: [],
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
};

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async ({ query = '', cuisine = '', diet = '', mealType = '', maxReadyTime = '', includeIngredients = '', calories = '', page = 1 }) => {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
            apiKey: 'e48d7514a07b4f6fbdaf6d720bb76554',
            number: 9,
            offset: (page - 1) * 9,
            query,
            cuisine,
            diet,
            type: mealType, 
            maxReadyTime: maxReadyTime ? parseInt(maxReadyTime) : undefined,
            includeIngredients: includeIngredients ? includeIngredients.split(',').map(ingredient => ingredient.trim()).join(',') : undefined,
            maxCalories: calories ? parseInt(calories) : undefined
        },
    });
    return {
        results: response.data.results,
        totalResults: response.data.totalResults,
        page,
    };
});

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload.results;
                state.totalResults = action.payload.totalResults;
                state.currentPage = action.payload.page;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default recipeSlice.reducer;
