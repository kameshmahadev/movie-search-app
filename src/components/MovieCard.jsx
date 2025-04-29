// src/components/MovieCard.jsx
import { Link } from "react-router-dom";

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
    return (
        <div className="border rounded overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col">
            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                    alt={movie.Title}
                    className="w-full h-72 object-cover"
                />
                <div className="p-4 flex-1">
                    <h2 className="text-lg font-semibold">{movie.Title}</h2>
                    <p className="text-gray-500">{movie.Year}</p>
                </div>
            </Link>

            <div className="p-4">
                {isFavorite ? (
                    <button
                        onClick={() => removeFromFavorites(movie.imdbID)}
                        className="bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-600 transition"
                    >
                        Remove from Favorites
                    </button>
                ) : (
                    <button
                        onClick={() => addToFavorites(movie)}
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
                    >
                        Add to Favorites
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
