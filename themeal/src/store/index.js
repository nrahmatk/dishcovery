import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './slicers/recipeSlice';
import favoriteReducer from './slicers/favoriteSlice';
import userSlice from './slicers/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    recipes: recipeReducer,
    favorites: favoriteReducer,
  }
});

export default store;
