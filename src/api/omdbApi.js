// src/api/omdbApi.js

const API_KEY = 'c6bb7eb3'; // 🔁 Replace with your actual OMDB API key
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1, type = '') => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}&type=${type}`);
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
