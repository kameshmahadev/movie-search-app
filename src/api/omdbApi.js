// src/api/omdbApi.js

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search for movies by title and optional type.
 * @param {string} query - The search term.
 * @param {number} page - The page number for pagination.
 * @param {string} type - The type filter (e.g., movie, series, episode).
 * @returns {Promise<Object>} - The search results.
 */
export const fetchMovies = async (query, page = 1, type = '') => {
    try {
        let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
        if (type) {
            url += `&type=${type}`;
        }
        const response = await fetch(url);
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
 * Fetch detailed information about a specific movie by IMDb ID.
 * @param {string} id - The IMDb ID of the movie.
 * @returns {Promise<Object>} - The movie details.
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
