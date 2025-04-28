// src/api.js

const API_KEY = 'c6bb7eb3';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, page = 1, type = '') => {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}${type ? `&type=${type}` : ''}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
        return data;
    } else {
        throw new Error(data.Error || 'Something went wrong while fetching movies.');
    }
};

export const fetchMovieDetails = async (id) => {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
        return data;
    } else {
        throw new Error(data.Error || 'Something went wrong while fetching movie details.');
    }
};
