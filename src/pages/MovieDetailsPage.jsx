// src/pages/MovieDetailsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api";
import Loading from "../components/Loading";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getMovie();
    }, [id]);

    const handleBack = () => {
        const searchQuery = localStorage.getItem("lastSearch") || "";
        if (searchQuery) {
            navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate("/movies");
        }
    };

    const handleAddToFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!storedFavorites.find((fav) => fav.imdbID === movie.imdbID)) {
            storedFavorites.push(movie);
            localStorage.setItem("favorites", JSON.stringify(storedFavorites));
            alert("Movie added to favorites!");
        } else {
            alert("This movie is already in your favorites!");
        }
    };

    if (loading) return <Loading />;
    if (!movie) return <div className="text-center mt-10">Movie not found</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                {movie.Poster && movie.Poster !== "N/A" && (
                    <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-4 rounded" />
                )}
                <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
                <p className="text-gray-600 text-sm mb-4">{movie.Plot}</p>
                <div className="text-sm text-gray-500">
                    <p><span className="font-semibold">Year:</span> {movie.Year}</p>
                    <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
                    <p><span className="font-semibold">Director:</span> {movie.Director}</p>
                    <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
                </div>
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={handleBack}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Back to Movies
                    </button>
                    <button
                        onClick={handleAddToFavorites}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    >
                        Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
