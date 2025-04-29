import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <div className="border border-gray-300 p-2 rounded">
            <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover mb-2" />
                <h2 className="text-lg font-semibold">{movie.Title}</h2>
                <p className="text-sm text-gray-600">{movie.Year}</p>
            </Link>
        </div>
    );
};

export default MovieCard;
