import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.imdbID}`} className="border rounded p-2 hover:shadow-lg">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
            <h3 className="mt-2 font-semibold">{movie.Title}</h3>
            <p>{movie.Year}</p>
        </Link>
    );
}

export default MovieCard;
