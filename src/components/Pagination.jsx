// src/components/Pagination.jsx

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded ${page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
