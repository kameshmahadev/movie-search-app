import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('all');

    const handleSearch = () => {
        onSearch(query, type);
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-4">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border p-2 rounded w-full md:w-1/2"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="all">All</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </select>
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
