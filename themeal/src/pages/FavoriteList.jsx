import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFavorite } from "../store/slicers/favoriteSlice";
import FavoriteItem from "../components/FavoriteItem";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFavorite(id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="recipe-list">
        <h1>Your Favorites</h1>
        <div className="card-list">
          {favorites.map((fav) => (
            <FavoriteItem key={fav.id} favorite={fav} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoriteList;
