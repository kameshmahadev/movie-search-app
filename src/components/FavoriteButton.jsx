import React, { useState } from "react";

const FavoriteButton = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        // Ideally, save to localStorage or backend (simple toggle here)
        setIsFavorite((prev) => !prev);
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded ${isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"}`}
        >
            {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
    );
};

export default FavoriteButton;
