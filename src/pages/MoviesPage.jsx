// src/pages/MoviesPage.jsx

import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const lastSearch = localStorage.getItem("lastSearch") || "Batman";
        const lastMovies = JSON.parse(localStorage.getItem("lastMovies")) || [];

        setSearchTerm(lastSearch);
        if (lastMovies.length > 0) {
            setMovies(lastMovies);
        } else {
            loadMovies(lastSearch);
        }

        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    const loadMovies = async (term) => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchMovies(term);
            if (data.Response === "True") {
                setMovies(data.Search);
                localStorage.setItem("lastMovies", JSON.stringify(data.Search)); // ✅ Save search result
            } else {
                setMovies([]);
                setError(data.Error || "No results found");
            }
        } catch {
            setMovies([]);
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        localStorage.setItem("lastSearch", searchTerm); // ✅ Save last search term
        loadMovies(searchTerm);
    };

    const addToFavorites = (movie) => {
        if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
            toast.info("Movie is already in favorites!");
            return;
        }
        const updated = [...favorites, movie];
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
        toast.success("Added to favorites!");
    };

    const removeFromFavorites = (id) => {
        const updated = favorites.filter((movie) => movie.imdbID !== id);
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
        toast.error("Removed from favorites");
    };

    const isFavorite = (id) => favorites.some((movie) => movie.imdbID === id);

    return (
        <div className="p-4">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies..."
                    className="border border-gray-400 px-4 py-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </form>

            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : error ? (
                <p className="text-center text-red-500 mt-10">{error}</p>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={isFavorite(movie.imdbID)}
                            addToFavorites={addToFavorites}
                            removeFromFavorites={removeFromFavorites}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">
                    No movies found. Try another search!
                </p>
            )}
        </div>
    );
};

export default MoviesPage;
