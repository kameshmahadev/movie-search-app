// src/components/SearchBar.jsx
const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    return (
        <form onSubmit={onSearch} className="flex gap-2 mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies..."
                className="border px-4 py-2 rounded w-full"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
