// src/pages/MovieDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../api/omdbApi";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
                setError("");
            } catch (err) {
                setError("Failed to fetch movie details. Try again.");
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10 text-lg animate-pulse">Loading movie details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-4 flex justify-between">
                <Link to="/" className="text-blue-500 underline">← Back to Search</Link>
                <Link to="/favorites" className="text-blue-500 underline">❤️ Back to Favorites</Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 grid md:grid-cols-2 gap-6">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                    alt={movie.Title}
                    className="rounded w-full h-auto object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p className="mt-4"><strong>Plot:</strong> {movie.Plot}</p>
                    <p className="mt-2"><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
                    <p><strong>Language:</strong> {movie.Language}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
