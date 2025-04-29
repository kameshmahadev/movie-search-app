const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, page = 1, type = '') => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}&type=${type}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return { Response: 'False', Error: 'Something went wrong' };
    }
};

// ✅ JUST ADD THIS PART BELOW
export const fetchMovieById = async (id) => {
    try {
        const response = await fetch(
            `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return { Response: 'False', Error: 'Something went wrong' };
    }
};
