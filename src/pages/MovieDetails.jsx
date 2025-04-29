// src/pages/MovieDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieById } from '../services/api';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const getMovie = async () => {
            try {
                const data = await fetchMovieById(id);
                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError('Something went wrong');
            }
        };
        getMovie();
    }, [id]);

    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
    if (!movie) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Link to="/" className="text-blue-500 underline">← Back to Search</Link>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
                <img src={movie.Poster} alt={movie.Title} className="w-full rounded" />
                <div>
                    <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
