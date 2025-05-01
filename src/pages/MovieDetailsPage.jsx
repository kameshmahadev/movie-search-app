// src/pages/MovieDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api/omdbApi";
import { toast } from "react-toastify";

const MovieDetailsPage = () => {
    const { id } = useParams(); // Get IMDb ID from route
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.error(err);
                setError("Movie not found.");
                toast.error("Movie not found. Redirecting to homepage...");
                setTimeout(() => navigate("/"), 3000);
            }
        };

        loadMovie();
    }, [id, navigate]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Redirecting...</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                ← Back
            </button>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                    alt={movie.Title}
                    className="w-full max-w-xs mx-auto mb-4"
                />
                <div className="space-y-2 text-gray-700">
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
