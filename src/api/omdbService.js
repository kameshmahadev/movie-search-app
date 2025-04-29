// src/api/omdbApi.js
const API_KEY = 'c6bb7eb3'; // your OMDB API key
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, type = '', page = 1) => {
    try {
        const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=${type}&page=${page}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.Response === 'True') {
            return { movies: data.Search, totalResults: data.totalResults };
        } else {
            throw new Error(data.Error);
        }
    } catch (error) {
        throw error;
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.Response === 'True') {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (error) {
        throw error;
    }
};
