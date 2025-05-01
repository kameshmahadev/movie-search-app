// src/components/MovieCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const MovieCard = ({ movie, showRemoveButton = false }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-transform duration-200 hover:scale-105">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
                alt={movie.Title}
                className="w-full h-64 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-1 text-gray-800">{movie.Title}</h2>
                <p className="text-sm text-gray-500 mb-3">{movie.Year}</p>

                <div className="mt-auto space-y-2">
                    <button
                        onClick={() => navigate(`/movies/${movie.imdbID}`)}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        View Details
                    </button>

                    <FavoriteButton movie={movie} showRemoveButton={showRemoveButton} />
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
