import { useEffect, useState } from 'react';

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(stored);
    }, []);

    const addFavorite = (movie) => {
        const updated = [...favorites, movie];
        localStorage.setItem('favorites', JSON.stringify(updated));
        setFavorites(updated);
    };

    const removeFavorite = (id) => {
        const updated = favorites.filter((m) => m.imdbID !== id);
        localStorage.setItem('favorites', JSON.stringify(updated));
        setFavorites(updated);
    };

    const isFavorite = (id) => favorites.some((m) => m.imdbID === id);

    return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;
