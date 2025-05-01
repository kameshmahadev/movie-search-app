// src/components/MovieCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const MovieCard = ({ movie, showRemoveButton = false }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
                alt={movie.Title}
                className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-1">{movie.Title}</h2>
                <p className="text-sm text-gray-500 mb-2">{movie.Year}</p>

                <div className="mt-auto space-y-2">
                    <button
                        onClick={() => navigate(`/movies/${movie.imdbID}`)} // ✅ fixed path
                        className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
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
