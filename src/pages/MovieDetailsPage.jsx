// src/pages/MovieDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/omdbApi"; // ✅ Updated import

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    const fetchMovie = async () => {
        try {
            const data = await fetchMovieDetails(id); // ✅ Updated function name
            if (data.Response === "True") {
                setMovie(data);
                setError("");
            } else {
                setError(data.Error || "Movie not found");
            }
        } catch (error) {
            setError("Failed to fetch movie details.");
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    }

    if (!movie) {
        return <p className="text-center mt-4">Loading...</p>;
    }

    return (
        <div className="p-6 flex flex-col md:flex-row gap-8">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                alt={movie.Title}
                className="w-64 h-auto rounded"
            />
            <div>
                <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
                <p><strong>Cast:</strong> {movie.Actors}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                <p><strong>Type:</strong> {movie.Type}</p>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
