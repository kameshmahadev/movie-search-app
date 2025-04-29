// src/pages/MoviesPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading"; // ✅ import loading spinner

const API_KEY = "c6bb7eb3";

const MoviesPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!searchQuery) return;
            setLoading(true);
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
                const data = await res.json();
                if (data.Response === "True") {
                    setMovies(data.Search);
                } else {
                    setMovies([]);
                }
            } catch (error) {
                console.error(error);
                setMovies([]);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [searchQuery]);

    return (
        <div className="p-4">
            {loading ? (
                <Loading />
            ) : movies.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No movies found. Try another search!
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MoviesPage;
