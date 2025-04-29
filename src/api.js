// src/api.js

const API_KEY = 'c6bb7eb3'; // ⚡ Replace with your real OMDB API key

export const fetchMovies = async (searchTerm) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
        const data = await response.json();
        if (data.Response === "True") {
            return data.Search;
        } else {
            return []; // Return empty array if no movies found
        }
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};
