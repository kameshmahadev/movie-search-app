import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center gap-4 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 p-2 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-300 p-2 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
