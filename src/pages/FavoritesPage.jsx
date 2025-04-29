// src/pages/FavoritesPage.jsx
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter((fav) => fav.imdbID !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    if (favorites.length === 0) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Favorites</h2>
                <p>No favorites yet. Start adding some!</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Favorites</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        removeFromFavorites={removeFromFavorites}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
