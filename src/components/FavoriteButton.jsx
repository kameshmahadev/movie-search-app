// src/components/FavoriteButton.jsx
import React from "react";
import useFavorites from "../hooks/useFavorites";

const FavoriteButton = ({ movie, showRemove = false }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    if (showRemove) {
        return (
            <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="px-3 py-1 rounded text-sm bg-red-600 text-white"
            >
                ❌ Remove
            </button>
        );
    }

    return (
        <button
            onClick={toggleFavorite}
            className={`px-3 py-1 rounded text-sm ${isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"
                }`}
        >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
