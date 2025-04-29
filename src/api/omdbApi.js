// src/api/omdbApi.js

const API_KEY = '6b651e3b'; // ✅ Your updated OMDB API Key
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search for movies by title and optional type (e.g., movie, series, episode).
 * 
 * @param {string} query - Movie search term (required)
 * @param {number} page - Page number for pagination (default is 1)
 * @param {string} type - Optional filter: "movie", "series", or "episode"
 * @returns {Promise<Object>} - OMDb API response object
 */
export const fetchMovies = async (query, page = 1, type = '') => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=${type}`);
        const data = await response.json();
        if (data.Response === 'True') {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get full details of a specific movie by IMDb ID.
 * 
 * @param {string} id - IMDb ID (required)
 * @returns {Promise<Object>} - Full movie details
 */
export const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await response.json();
        if (data.Response === 'True') {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
