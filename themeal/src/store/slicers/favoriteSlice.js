import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import InstanceServer from '../../axiosInstance';

const initialState = {
    favorites: [],
    loading: false,
    error: null,
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
    const response = await InstanceServer.get('/save-recipe', {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    });
    return response.data;
});

export const addFavorite = createAsyncThunk('favorites/addFavorite', async (RecipeDetail) => {
    const userId = localStorage.getItem('userid');
    console.log(RecipeDetail)
    const response = await InstanceServer.post('/save-recipe', { title: RecipeDetail.title, image: RecipeDetail.image, RecipeId: RecipeDetail.id, UserId: userId }, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    });
    return response.data;
});

export const removeFavorite = createAsyncThunk('favorites/removeFavorite', async (id) => {
    await InstanceServer.delete(`/save-recipe/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    });
    return id;  
});

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.favorites.push(action.payload);
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter(fav => fav.id !== action.payload); // Gunakan id untuk filter
            });
    },
});

export default favoriteSlice.reducer;
