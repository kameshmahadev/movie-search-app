// src/components/MovieCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(movie.imdbID);
        } else {
            addToFavorites(movie);
        }
    };

    return (
        <div className="bg-white rounded shadow p-4 flex flex-col">
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                    alt={movie.Title}
                    className="h-60 object-cover mb-2 rounded hover:scale-105 transition duration-300"
                />
                <h3 className="font-bold text-lg">{movie.Title}</h3>
                <p className="text-sm text-gray-600">{movie.Year}</p>
            </Link>
            <button
                onClick={handleFavoriteClick}
                className={`mt-2 px-3 py-1 rounded ${isFavorite ? "bg-red-500" : "bg-green-500"
                    } text-white`}
            >
                {isFavorite ? "Remove Favorite" : "Add to Favorites"}
            </button>
        </div>
    );
};

export default MovieCard;
