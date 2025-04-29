import useFavorites from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
    const { favorites } = useFavorites();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorite movies added yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
