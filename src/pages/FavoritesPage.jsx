// src/pages/FavoritesPage.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../App";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
    const { favorites } = useContext(FavoritesContext);
    const navigate = useNavigate();

    return (
        <div className="p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-4">My Favorites</h1>

            {favorites.length === 0 ? (
                <p>No favorite movies added yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} showRemoveButton={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
