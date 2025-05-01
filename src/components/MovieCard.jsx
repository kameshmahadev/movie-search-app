// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const MovieCard = ({ movie }) => {
    return (
        <div className="border p-2 rounded shadow hover:shadow-lg transition">
            <Link to={`/movies/${movie.imdbID}`}>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
                    alt={movie.Title}
                    className="w-full h-72 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
                <p className="text-sm text-gray-600">{movie.Year}</p>
            </Link>
            <div className="mt-2">
                <FavoriteButton movie={movie} />
            </div>
        </div>
    );
};

export default MovieCard;
