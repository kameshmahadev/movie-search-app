import React from "react";

const SearchBar = ({ searchTerm, type, onSearch, onTypeChange }) => {
    return (
        <form onSubmit={onSearch} className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <input
                name="search"
                type="text"
                defaultValue={searchTerm}
                placeholder="Search movies..."
                className="p-2 border rounded w-full md:w-1/2"
            />
            <select
                value={type}
                onChange={onTypeChange}
                className="p-2 border rounded"
            >
                <option value="">All</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
