// src/components/FavoriteButton.jsx
import React, { useContext } from "react";
import { FavoritesContext } from "../App";

const FavoriteButton = ({ movie, showRemoveButton }) => {
    const { favorites, setFavorites } = useContext(FavoritesContext);

    const isFavorite = favorites.some((m) => m.imdbID === movie.imdbID);

    const addToFavorites = () => {
        if (!isFavorite) {
            setFavorites([...favorites, movie]);
        }
    };

    const removeFromFavorites = () => {
        setFavorites(favorites.filter((m) => m.imdbID !== movie.imdbID));
    };

    if (showRemoveButton) {
        return (
            <button
                onClick={removeFromFavorites}
                className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
            >
                Remove from Favorites
            </button>
        );
    }

    return (
        <button
            onClick={isFavorite ? removeFromFavorites : addToFavorites}
            className={`w-full ${isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                } text-white px-3 py-2 rounded transition`}
        >
            {isFavorite ? "Remove Favorite" : "Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
