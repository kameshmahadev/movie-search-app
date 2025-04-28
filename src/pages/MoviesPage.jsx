// src/pages/MoviesPage.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import { fetchMovies } from '../api';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        const lastSearch = localStorage.getItem('lastSearch') || 'Batman';
        setSearchTerm(lastSearch);
        loadMovies(lastSearch, 1, '');
    }, []);

    const loadMovies = async (term, pageNum, type) => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchMovies(term, pageNum, type);
            setMovies(data.Search);
            setTotalResults(parseInt(data.totalResults));
        } catch (err) {
            console.error(err);
            setError(err.message);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        localStorage.setItem('lastSearch', searchTerm);
        setPage(1);
        loadMovies(searchTerm, 1, typeFilter);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        loadMovies(searchTerm, newPage, typeFilter);
    };

    const handleTypeChange = (e) => {
        setTypeFilter(e.target.value);
        setPage(1);
        loadMovies(searchTerm, 1, e.target.value);
    };

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="p-4">
            <form onSubmit={handleSearch} className="flex flex-wrap gap-2 mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies..."
                    className="border border-gray-400 px-4 py-2 rounded w-full md:w-auto flex-grow"
                />
                <select
                    value={typeFilter}
                    onChange={handleTypeChange}
                    className="border border-gray-400 px-4 py-2 rounded"
                >
                    <option value="">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                </select>
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
                <div className="text-center text-red-500 mt-10">{error}</div>
            ) : (
                <>
                    {movies.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {movies.map((movie) => (
                                    <Link
                                        to={`/movie/${movie.imdbID}`}
                                        key={movie.imdbID}
                                        className="border rounded p-4 shadow hover:shadow-lg transition block"
                                    >
                                        {/* ✅ Wrapped each card in <Link> */}
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

                            {/* Pagination Controls */}
                            <div className="flex justify-center items-center mt-6 gap-4">
                                <button
                                    disabled={page === 1}
                                    onClick={() => handlePageChange(page - 1)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <span>Page {page} of {totalPages}</span>
                                <button
                                    disabled={page === totalPages}
                                    onClick={() => handlePageChange(page + 1)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500 mt-10">No movies found. Try another search!</p>
                    )}
                </>
            )}
        </div>
    );
};

export default MoviesPage;
