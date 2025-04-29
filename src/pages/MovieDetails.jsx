// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../services/api";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
            const data = await fetchMovieById(id);
            setMovie(data);
        };
        getMovie();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} className="w-64" />
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}</p>
        </div>
    );
};

export default MovieDetail;
