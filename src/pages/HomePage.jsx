import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";

function HomePage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await searchMovies(query);
            if (data.Response === "True") {
                setMovies(data.Search);
                setError("");
            } else {
                setMovies([]);
                setError(data.Error);
            }
        } catch (err) {
            setError("Something went wrong!");
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSearch} className="flex mb-4">
                <input
                    type="text"
                    className="border p-2 flex-grow"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2">Search</button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
