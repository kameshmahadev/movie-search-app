// src/api.js
const API_KEY = "c6bb7eb3"; // Make sure your API Key is correct.

export const fetchMovies = async (searchTerm) => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
        const data = await res.json();
        if (data.Response === "True") {
            return data.Search; // Very important: return data.Search (array of movies)
        } else {
            return []; // No movies found
        }
    } catch (error) {
        console.error('Failed to fetch movies:', error);
        return [];
    }
};
