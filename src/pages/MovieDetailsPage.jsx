import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";

function MovieDetailsPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMovie() {
            try {
                const data = await getMovieDetails(id);
                if (data.Response === "True") {
                    setMovie(data);
                    setError("");
                } else {
                    setError(data.Error);
                }
            } catch {
                setError("Something went wrong.");
            }
        }

        fetchMovie();
    }, [id]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!movie) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <img src={movie.Poster} alt={movie.Title} className="w-1/2 mx-auto" />
            <h1 className="text-2xl font-bold mt-4">{movie.Title}</h1>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
    );
}

export default MovieDetailsPage;
