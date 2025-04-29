import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, type);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border rounded p-2"
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
