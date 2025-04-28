// src/api/index.js

const API_KEY = 'c6bb7eb3'; // replace with your API key
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, page = 1, type = '') => {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}${type ? `&type=${type}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchMovieById = async (id) => {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
