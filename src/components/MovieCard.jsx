// src/components/MovieCard.jsx

import React from 'react';

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
    const handleFavoriteClick = () => {
        isFavorite ? removeFromFavorites(movie.imdbID) : addToFavorites(movie);
    };

    return (
        <div className="bg-white rounded shadow p-4 flex flex-col">
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                alt={movie.Title}
                className="h-60 object-cover mb-2 rounded"
            />
            <h3 className="font-bold text-lg">{movie.Title}</h3>
            <p className="text-sm text-gray-600">{movie.Year}</p>
            <button
                onClick={handleFavoriteClick}
                className={`mt-2 px-3 py-1 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
            >
                {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default MovieCard;
