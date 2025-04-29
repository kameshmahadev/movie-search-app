// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.imdbID}`} className="border p-2 hover:shadow-lg">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
            <h3 className="font-bold">{movie.Title}</h3>
            <p>{movie.Year}</p>
        </Link>
    );
};

export default MovieCard;
