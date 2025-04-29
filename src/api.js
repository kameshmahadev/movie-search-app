// src/services/api.js

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMovies = async (query, page = 1, type = "") => {
    try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}&type=${type}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to fetch movies");
    }
};

export const fetchMovieById = async (id) => {
    try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error("Failed to fetch movie details");
    }
};
