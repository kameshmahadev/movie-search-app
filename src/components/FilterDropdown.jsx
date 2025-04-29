// src/components/FilterDropdown.jsx

import React from 'react';

const FilterDropdown = ({ selectedType, setSelectedType }) => {
    return (
        <div className="mb-4">
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="">All Types</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </select>
        </div>
    );
};

export default FilterDropdown;
