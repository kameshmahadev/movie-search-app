import useFavorites from '../hooks/useFavorites';

const MovieCard = ({ movie }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const toggleFavorite = () => {
        isFavorite(movie.imdbID)
            ? removeFavorite(movie.imdbID)
            : addFavorite(movie);
    };

    return (
        <div className="border rounded p-4">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
            <h2 className="mt-2 font-semibold text-lg">{movie.Title}</h2>
            <button
                onClick={toggleFavorite}
                className="mt-2 text-sm bg-green-500 text-white px-2 py-1 rounded"
            >
                {isFavorite(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default MovieCard;
