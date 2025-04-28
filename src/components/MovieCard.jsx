import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, from }) => {
    return (
        <Link
            to={`/movie/${movie.imdbID}`}
            state={{ from }}
            className="border p-2 rounded shadow hover:shadow-md transition"
        >
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.Title}
                className="w-full h-64 object-cover mb-2 rounded"
            />
            <h3 className="font-bold text-lg">{movie.Title}</h3>
            <p className="text-sm text-gray-600">{movie.Year}</p>
        </Link>
    );
};

export default MovieCard;
