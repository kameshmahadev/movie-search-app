// src/pages/MoviesPage.jsx

import { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import { Link } from 'react-router-dom'; // ✅ Added Link

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const lastSearch = localStorage.getItem('lastSearch') || 'Batman';
        setSearchTerm(lastSearch);
        loadMovies(lastSearch);
    }, []);

    const loadMovies = async (term) => {
        setLoading(true);
        try {
            const data = await fetchMovies(term);
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        localStorage.setItem('lastSearch', searchTerm);
        loadMovies(searchTerm);
    };

    return (
        <div className="p-4">
            {/* Search Form */}
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

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                <>
                    {/* Movies Listing */}
                    {movies && movies.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {movies.map((movie) => (
                                <Link
                                    to={`/movie/${movie.imdbID}`} // ✅ Corrected Link
                                    key={movie.imdbID}
                                    className="border rounded p-4 shadow hover:shadow-lg transition block"
                                >
                                    <img
                                        src={movie.Poster !== "N/A" ? movie.Poster : '/no-image.png'}
                                        alt={movie.Title}
                                        className="w-full h-60 object-cover mb-2 rounded"
                                    />
                                    <h2 className="font-semibold text-lg">{movie.Title}</h2>
                                    <p className="text-sm text-gray-600">{movie.Year}</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-10">
                            No movies found. Try another search!
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default MoviesPage;
