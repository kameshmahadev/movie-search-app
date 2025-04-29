// src/api/omdbApi.js

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
console.log("✅ OMDB API Key loaded:", API_KEY);
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search for movies by title, type, and page.
 * @param {string} query - Movie title to search.
 * @param {string} type - Type filter (movie, series, episode).
 * @param {number} page - Page number for pagination.
 * @returns {Promise<Object>} - OMDB response object.
 */
export const fetchMovies = async (query, type = '', page = 1) => {
    try {
        if (!query) throw new Error("Search term is required.");
        let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
        if (type) url += `&type=${type}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get movie details by IMDb ID.
 * @param {string} id - IMDb ID.
 * @returns {Promise<Object>} - Movie details.
 */
export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await response.json();

        if (data.Response === "True") {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
