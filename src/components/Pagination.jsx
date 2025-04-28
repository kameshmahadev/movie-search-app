import React from "react";

const Pagination = ({ currentPage, totalResults, onPageChange }) => {
    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="mt-6 flex justify-center items-center gap-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="font-medium">Page {currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
