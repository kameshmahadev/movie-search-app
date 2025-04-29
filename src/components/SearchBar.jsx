// src/components/SearchBar.jsx

import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    return (
        <form onSubmit={onSearch} className="flex gap-2 mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
