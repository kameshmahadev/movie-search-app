// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Movies from "../components/Movies";
import { fetchMovies } from "../services/api";

const Home = () => {
    const [query, setQuery] = useState("batman");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("");
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState("");

    const searchMovies = async () => {
        try {
            const data = await fetchMovies(query, page, type);
            if (data.Response === "True") {
                setMovies(data.Search);
                setTotalResults(parseInt(data.totalResults));
                setError("");
            } else {
                setError(data.Error);
                setMovies([]);
            }
        } catch (err) {
            setError("Something went wrong.");
        }
    };

    useEffect(() => {
        searchMovies();
    }, [page, type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        searchMovies();
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border p-2 flex-1"
                    placeholder="Search movies..."
                />
                <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2">
                    <option value="">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
            </form>

            {error && <div className="text-red-500">{error}</div>}
            <Movies movies={movies} />
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="p-2 bg-gray-300"
                >
                    Prev
                </button>
                <span>Page {page}</span>
                <button
                    onClick={() => setPage((prev) => (page * 10 < totalResults ? prev + 1 : prev))}
                    disabled={page * 10 >= totalResults}
                    className="p-2 bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
