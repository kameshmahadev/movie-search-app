import React from "react";

const MovieDetails = ({ movie, onAddToFavorites }) => {
    return (
        <div className="flex flex-col md:flex-row gap-6">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.Title}
                className="w-64 h-auto rounded shadow-lg"
            />
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

                <button
                    onClick={onAddToFavorites}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add to Favorites
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
