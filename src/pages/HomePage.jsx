import { useState, useEffect } from "react";
import { fetchMovies } from "../api/omdbApi";
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
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    const fetchMovieList = async (page = 1) => {
        try {
            const data = await fetchMovies(searchTerm, selectedType, page);
            if (data.Response === "True") {
                setMovies(data.Search);
                setTotalResults(Number(data.totalResults));
                setError("");
            } else {
                setMovies([]);
                setTotalResults(0);
                setError(data.Error || "No movies found.");
            }
        } catch (err) {
            setMovies([]);
            setError("Something went wrong. Please try again later.");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchMovieList(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchMovieList(page);
    };

    const addToFavorites = (movie) => {
        if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
            const updated = [...favorites, movie];
            setFavorites(updated);
        }
    };

    const removeFromFavorites = (id) => {
        const updated = favorites.filter((fav) => fav.imdbID !== id);
        setFavorites(updated);
    };

    useEffect(() => {
        if (searchTerm) {
            fetchMovieList(currentPage);
        }
    }, [selectedType]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

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
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                        isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
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
