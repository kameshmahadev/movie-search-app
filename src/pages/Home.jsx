import React, { useState } from 'react';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        try {
            const data = await fetchMovies(searchTerm);
            if (data.Response === 'True') {
                setMovies(data.Search);
                setError('');
            } else {
                setMovies([]);
                setError(data.Error);
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Movie Search App</h1>
            <form onSubmit={handleSearch} className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-400 p-2 w-1/2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
                    Search
                </button>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
