import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleRemove = (id) => {
        const updatedFavorites = favorites.filter(movie => movie.imdbID !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    if (favorites.length === 0) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
                <p>No favorite movies added yet!</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                    <div key={movie.imdbID} className="border rounded-lg overflow-hidden shadow-md">
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                                alt={movie.Title}
                                className="w-full h-80 object-cover"
                            />
                        </Link>
                        <div className="p-2">
                            <h3 className="font-bold">{movie.Title}</h3>
                            <p className="text-sm">{movie.Year}</p>
                            <button
                                onClick={() => handleRemove(movie.imdbID)}
                                className="mt-2 w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
