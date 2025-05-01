import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MovieDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely access movie from location.state
    const movie = location?.state?.movie;

    if (!movie) {
        toast.error("Movie details not found. Redirecting to homepage...");
        setTimeout(() => navigate("/"), 3000); // redirect after 3 sec
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Redirecting...</p>
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
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Type:</strong> {movie.Type}</p>
                <p><strong>IMDb ID:</strong> {movie.imdbID}</p>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
