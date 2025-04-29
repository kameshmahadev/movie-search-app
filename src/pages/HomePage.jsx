// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { searchMovies } from "../api/omdbApi";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const fetchMovies = async (page = 1) => {
        try {
            const data = await searchMovies(searchTerm, selectedType, page);
            if (data.Response === "True") {
                setMovies(data.Search);
                setTotalResults(Number(data.totalResults));
                setError("");
            } else {
                setMovies([]);
                setTotalResults(0);
                setError(data.Error || "No movies found");
            }
        } catch (error) {
            setMovies([]);
            setTotalResults(0);
            setError("Something went wrong. Try again later.");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchMovies(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchMovies(page);
    };

    useEffect(() => {
        if (searchTerm) {
            fetchMovies(currentPage);
        }
    }, [selectedType]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
            setFavorites([...favorites, movie]);
        }
    };

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(fav => fav.imdbID !== id);
        setFavorites(updatedFavorites);
    };

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="p-6">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
            />
            <FilterDropdown
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />

            {error && (
                <p className="text-red-500 text-center my-4">{error}</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                        isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
                    />
                ))}
            </div>

            {movies.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default HomePage;
