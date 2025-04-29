// src/components/FilterDropdown.jsx
const FilterDropdown = ({ selectedType, setSelectedType }) => {
    return (
        <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border px-4 py-2 rounded mb-4"
        >
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
        </select>
    );
};

export default FilterDropdown;
