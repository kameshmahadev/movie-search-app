const API_KEY = "c6bb7eb3"; // ✅ Your OMDb API Key
const BASE_URL = "https://www.omdbapi.com/";

export async function fetchMovies(searchTerm, page = 1, type = "") {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}`;
    if (type) url += `&type=${type}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function fetchMovieDetails(id) {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
