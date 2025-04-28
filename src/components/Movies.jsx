import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('vaanam'); // Default search
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovies = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${searchTerm}`);
            const data = await res.json();
            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setError(data.Error);
                setMovies([]);
            }
        } catch (err) {
            setError('Failed to fetch movies.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies();
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Movies</h1>

            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies..."
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="border p-2 rounded shadow">
                        <Link to={`/movies/${movie.imdbID}`}>
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                                alt={movie.Title}
                                className="w-full h-60 object-cover mb-2"
                            />
                            <h2 className="text-lg font-semibold">{movie.Title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
